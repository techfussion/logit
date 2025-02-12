import { 
    Body, 
    Controller, 
    Delete, 
    Get, 
    Param, 
    Patch, 
    Post, 
    Req, 
    UseGuards 
} from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guard/jwt-auth.guard";
import { FeedbackService } from "./feedback.service";
import { CreateFeedbackDto, UpdateFeedbackDto } from "./dto/feeback.dto";
import { Role } from "@prisma/client";
import { RolesGuard } from "../auth/guard/roles.guard";
import { Roles } from "../auth/decorator/roles.decorator";

@UseGuards(JwtAuthGuard)
@Controller('feedback')
export class FeedbackController {
    constructor(private feedbackService: FeedbackService) {}

    @Get()
    getUserFeedback(@Req() req: Request & { user: any }) {
        const userId = req.user.id
        return this.feedbackService.getUserFeedback(userId);
    }

    @Get(':id')
    @Roles(Role.INDUSTRY_SUPERVISOR, Role.SCHOOL_SUPERVISOR)
    @UseGuards(RolesGuard)
    getFeedbacksForSupervisor(@Req() req: Request & { user: any }, @Param('id') id: string) {
        const userId = req.user.sub;

        // userId - the current user, id - the target student/intern
        return this.feedbackService.getFeedbacksForSupervisor(userId, id);
    }

    @Patch(':id/resolve')
    @Roles(Role.INDUSTRY_SUPERVISOR)
    @UseGuards(RolesGuard)
    markAsResolve(@Param('id') id: string) {
        return this.feedbackService.markAsResolve(id);
    }

    @Post()
    createFeedback(@Body() createFeedbackDto: CreateFeedbackDto) {
        return this.feedbackService.createFeedback(createFeedbackDto);
    }

    @Patch(':id')
    updateFeedback(@Param('id') id: string, @Body() updateFeedbackDto: UpdateFeedbackDto) {
        return this.feedbackService.updateFeedback(id, updateFeedbackDto);
    }


    @Delete(':id')
    deleteFeedback(@Param('id') id: string) {
        return this.feedbackService.deleteFeedback(id);
    }
}