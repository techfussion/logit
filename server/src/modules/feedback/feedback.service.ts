import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateFeedbackDto, UpdateFeedbackDto } from "./dto/feeback.dto";

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
