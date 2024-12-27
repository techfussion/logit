import { 
    Body, 
    Controller, 
    Delete, 
    Get, 
    Param, 
    Patch, 
    Post, 
    Query, 
    Req, 
    UseGuards 
  } from "@nestjs/common";
  import { LogService } from "./log.service";
  import { JwtAuthGuard } from "../auth/guard/jwt-auth.guard";
  import { CreateLogDto, UpdateLogDto } from "./dto/log.dto";
  
  @Controller('log')
  export class LogController {
    constructor(private logService: LogService) {}
  
    @UseGuards(JwtAuthGuard)
    @Get()
    getAllUserLogs(@Req() req: Request & { user: any}) {
        const studentId = req.user.sub;
        return this.logService.getAllUserLogs(studentId);
    }
  
    @UseGuards(JwtAuthGuard)
    @Get('week')
    getLogsByWeek(@Req() req: Request & { user: any}, @Query('week') week: number) {
        const userId = req.user.sub;
        return this.logService.getLogsByWeek(userId, week);
      }
  
    @UseGuards(JwtAuthGuard)
    @Post()
    createLog(@Req() req: Request & {user: any}, @Body() createLogDto: CreateLogDto) {
      const { sub } = req.user;
      return this.logService.createLog(sub, createLogDto);
    }
  
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    deleteLog(@Param('id') id: string) {
      return this.logService.deleteLog(id);
    }
  
    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    updateLog(@Param('id') id: string, @Body() updateLogDto: UpdateLogDto) {
      return this.logService.updateLog(id, updateLogDto);
    }
  }
  