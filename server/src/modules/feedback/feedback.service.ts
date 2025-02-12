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

    // async getFeedbacksForSupervisor(userId: string, studentId: string) {
    //     try {
    //       // Fetch the student's user ID from the student profile
    //       const { userId: userIdFromStudentId } = await this.prisma.student.findFirst({
    //         where: { id: studentId },
    //         select: { userId: true },
    //       });
      
    //       if (!userIdFromStudentId) {
    //         throw new NotFoundException(`Student with ID ${studentId} not found`);
    //       }
      
    //       // Fetch student profile and related supervisor details
    //       const { studentProfile } = await this.prisma.user.findFirst({
    //         where: { id: userIdFromStudentId },
    //         select: { studentProfile: true },
    //       });
      
    //       if (!studentProfile) {
    //         throw new NotFoundException(`Student with userId ${userIdFromStudentId} not found`);
    //       }
      
    //       const { industrySupervisorProfile, schoolSupervisorProfile } = await this.prisma.user.findFirst({
    //         where: { id: userId },
    //         select: {
    //           industrySupervisorProfile: true,
    //           schoolSupervisorProfile: true,
    //         },
    //       });
      
    //       const { industrySupervisorId, schoolSupervisorId } = studentProfile;
      
    //       // Authorization check
    //       if (
    //         industrySupervisorProfile?.id !== industrySupervisorId &&
    //         schoolSupervisorProfile?.id !== schoolSupervisorId
    //       ) {
    //         throw new UnauthorizedException('You do not have access to this resource');
    //       }
      
    //       // Fetch logentries for the student and group feedback for the student
    //       const logsWithFeedback = await this.prisma.logEntry.findMany({
    //         where: { studentId: studentId},
    //         include: {
    //           feedback: true
    //         }
    //       });

    //       console.log(logsWithFeedback);

    //       if (!logsWithFeedback.length) {
    //         return [];
    //       }
      
    //       // Group feedback by log entry
    //       const groupedFeedbacks = logsWithFeedback.reduce((acc, feedback) => {
    //         const key = feedback.logWeek || 'No Log Entry';//logEntry?
    //         if (!acc[key]) acc[key] = [];
    //         acc[key].push(feedback);
    //         return acc;
    //       }, {});
      
    //       return groupedFeedbacks;
    //     } catch (error) {
    //       if (error instanceof Prisma.PrismaClientKnownRequestError) {
    //         throw new BadRequestException('Database operation failed');
    //       }
    //       throw error;
    //     }
    //   }

    async getFeedbacksForSupervisor(userId: string, studentId: string) {
      try {
          // Fetch the student's user ID
          const student = await this.prisma.student.findFirst({
              where: { id: studentId },
              select: { userId: true },
          });
  
          if (!student?.userId) {
              throw new NotFoundException(`Student with ID ${studentId} not found`);
          }
  
          // Fetch student profile and supervisor details
          const user = await this.prisma.user.findFirst({
              where: { id: student.userId },
              select: { studentProfile: { select: { industrySupervisorId: true, schoolSupervisorId: true } } },
          });
  
          if (!user?.studentProfile) {
              throw new NotFoundException(`Student with userId ${student.userId} not found`);
          }
  
          const supervisor = await this.prisma.user.findFirst({
              where: { id: userId },
              select: {
                  industrySupervisorProfile: { select: { id: true } },
                  schoolSupervisorProfile: { select: { id: true } },
              },
          });
  
          // Authorization check
          if (
              supervisor?.industrySupervisorProfile?.id !== user.studentProfile.industrySupervisorId &&
              supervisor?.schoolSupervisorProfile?.id !== user.studentProfile.schoolSupervisorId
          ) {
              throw new UnauthorizedException('You do not have access to this resource');
          }
  
          // Fetch log entries along with feedback details
          const logsWithFeedback = await this.prisma.logEntry.findMany({
              where: { studentId: studentId },
              include: {
                  feedback: {
                      include: {
                          submittedBy: {
                              select: {
                                  id: true,
                                  email: true,
                                  role: true,
                                  createdAt: true,
                              },
                          },
                      },
                  },
              },
              orderBy: { createdAt: 'asc' },
          });
  
          if (!logsWithFeedback.length) {
              return [];
          }
  
          // Transform response to the expected format
          return logsWithFeedback.flatMap((log) =>
              log.feedback.map((feedback) => ({
                  id: feedback.id,
                  content: feedback.content,
                  submittedById: feedback.submittedById,
                  logEntryId: feedback.logEntryId,
                  industrySupervisorId: feedback.industrySupervisorId,
                  schoolSupervisorId: feedback.schoolSupervisorId,
                  createdAt: feedback.createdAt.toISOString(),
                  submittedBy: {
                      id: feedback.submittedBy.id,
                      email: feedback.submittedBy.email,
                      role: feedback.submittedBy.role,
                      createdAt: feedback.submittedBy.createdAt.toISOString(),
                  },
                  logEntry: {
                      id: log.id,
                      description: log.description,
                      studentId: log.studentId,
                      clockInTime: log.clockInTime.toISOString(),
                      logWeek: log.logWeek,
                      logDay: log.logDay,
                      createdAt: log.createdAt.toISOString(),
                  },
              }))
          );
      } catch (error) {
          if (error instanceof Prisma.PrismaClientKnownRequestError) {
              throw new BadRequestException('Database operation failed');
          }
          throw error;
      }
    }
  

    async markAsResolve(logEntryId: string) {
        try {
            // Delete feedbacks for the given log entry if any exist
            const deletedFeedbacks = await this.prisma.feedback.deleteMany({
                where: { id: logEntryId },
            });

            if (!deletedFeedbacks.count) {
                return "No feedbacks to resolve";
            }

            // Fetch and group feedback for the student
            const feedbacks = await this.prisma.feedback.findMany({
                where: { id: logEntryId },
                include: {
                    submittedBy: true,
                    logEntry: true,
                },
                orderBy: { createdAt: 'asc' },
            });

            if (!feedbacks.length) {
                return [];
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
