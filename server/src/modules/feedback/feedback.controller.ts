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

@Controller('feedback')
export class FeedbackController {
    constructor(private feedbackService: FeedbackService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    getUserFeedback(@Req() req: Request & { user: any }) {
        const userId = req.user.id
        return this.feedbackService.getUserFeedback(userId);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    getFeedbacksForSupervisor(@Req() req: Request & { user: any }, @Param('id') id: string) {
        const userId = req.user.sub;

        // userId - the current user, id - the target student/intern
        return this.feedbackService.getFeedbacksForSupervisor(userId, id);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    createFeedback(@Body() createFeedbackDto: CreateFeedbackDto) {
        return this.feedbackService.createFeedback(createFeedbackDto);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    updateFeedback(@Param('id') id: string, @Body() updateFeedbackDto: UpdateFeedbackDto) {
        return this.feedbackService.updateFeedback(id, updateFeedbackDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    deleteFeedback(@Param('id') id: string) {
        return this.feedbackService.deleteFeedback(id);
    }
}