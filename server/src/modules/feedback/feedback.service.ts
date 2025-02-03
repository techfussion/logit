import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateFeedbackDto, UpdateFeedbackDto } from "./dto/feeback.dto";
import { Prisma } from "@prisma/client";

@Injectable()
export class FeedbackService {
    constructor(private readonly prisma: PrismaService) {}

    async getUserFeedback(userId: string) {
        try {
            const feedbacks = await this.prisma.feedback.findMany({
                where: { id: userId },
                include: {
                    submittedBy: true,
                    logEntry: true,
                },
                orderBy: { createdAt: 'asc' },
            });

            // group feedbacks by log entry
            const groupedFeedbacks = feedbacks.reduce((acc, feedback) => {
                if (!acc[feedback.logEntryId]) {
                    acc[feedback.logEntryId] = [];
                }
                acc[feedback.logEntryId].push(feedback);
                return acc;
            }, {});

            return groupedFeedbacks;
        } catch (error) {
            this.handleError("retrieve feedback", error);
        }
    }

    async getFeedbacksForSupervisor(userId: string, studentId: string) {
        try {
          // Fetch the student's user ID from the student profile
          const { userId: userIdFromStudentId } = await this.prisma.student.findFirst({
            where: { id: studentId },
            select: { userId: true },
          });
      
          if (!userIdFromStudentId) {
            throw new NotFoundException(`Student with ID ${studentId} not found`);
          }
      
          // Fetch student profile and related supervisor details
          const { studentProfile } = await this.prisma.user.findFirst({
            where: { id: userIdFromStudentId },
            select: { studentProfile: true },
          });
      
          if (!studentProfile) {
            throw new NotFoundException(`Student with userId ${userIdFromStudentId} not found`);
          }
      
          const { industrySupervisorProfile, schoolSupervisorProfile } = await this.prisma.user.findFirst({
            where: { id: userId },
            select: {
              industrySupervisorProfile: true,
              schoolSupervisorProfile: true,
            },
          });
      
          const { industrySupervisorId, schoolSupervisorId } = studentProfile;
      
          // Authorization check
          if (
            industrySupervisorProfile?.id !== industrySupervisorId &&
            schoolSupervisorProfile?.id !== schoolSupervisorId
          ) {
            throw new UnauthorizedException('You do not have access to this resource');
          }
      
          // Fetch and group feedback for the student
          const feedbacks = await this.prisma.feedback.findMany({
            where: { id: userIdFromStudentId },
            include: {
              submittedBy: true,
              logEntry: true,
            },
            orderBy: { createdAt: 'asc' },
          });
      
          if (!feedbacks.length) {
            return `No feedback found for student ID ${studentId}`;
          }
      
          // Group feedback by log entry
          const groupedFeedbacks = feedbacks.reduce((acc, feedback) => {
            const key = feedback.logEntry?.logWeek || 'No Log Entry';
            if (!acc[key]) acc[key] = [];
            acc[key].push(feedback);
            return acc;
          }, {});
      
          return groupedFeedbacks;
        } catch (error) {
          if (error instanceof Prisma.PrismaClientKnownRequestError) {
            throw new BadRequestException('Database operation failed');
          }
          throw error;
        }
      }
      

    async createFeedback(createFeedbackDto: CreateFeedbackDto) {
        const { content, submittedById, logEntryId } = createFeedbackDto;

        try {
            return await this.prisma.feedback.create({
                data: {
                    content,
                    submittedById,
                    logEntryId,
                },
            });
        } catch (error) {
            this.handleError("create feedback", error);
        }
    }

    async updateFeedback(id: string, updateFeedbackDto: UpdateFeedbackDto) {
        const { content, submittedById, logEntryId } = updateFeedbackDto;

        try {
            await this.ensureFeedbackExists(id);

            return await this.prisma.feedback.update({
                where: { id },
                data: {
                    content,
                    submittedById,
                    logEntryId,
                },
            });
        } catch (error) {
            this.handleError("update feedback", error, id);
        }
    }

    async deleteFeedback(id: string) {
        try {
            await this.ensureFeedbackExists(id);

            await this.prisma.feedback.delete({
                where: { id },
            });

            return { message: "Feedback successfully deleted" };
        } catch (error) {
            this.handleError("delete feedback", error, id);
        }
    }

    // Helper method to check feedback existence
    private async ensureFeedbackExists(id: string) {
        const feedback = await this.prisma.feedback.findUnique({ where: { id } });
        if (!feedback) {
            throw new NotFoundException(`Feedback with ID ${id} not found`);
        }
    }

    // Centralized error handler
    private handleError(action: string, error: any, id?: string) {
        if (error instanceof NotFoundException) {
            throw error;
        }
        const idMessage = id ? ` for ID ${id}` : "";
        throw new Error(`Failed to ${action}${idMessage}: ${error.message}`);
    }
}
