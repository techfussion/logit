import { Controller, Get, Patch, Body, Req, Param, UseGuards, Delete } from "@nestjs/common";
import { UserService } from "./user.service";
import { JwtAuthGuard } from "../auth/guard/jwt-auth.guard";
import { AddInustrySupervisorDto, AddSchoolSupervisorDto, TransferStudentsToNewIndustrySupervisorDto, UpdateUserProfileDto } from "./dto/user.dto";

@Controller("user")
export class UserController {
    constructor(private userService: UserService) {}

    @UseGuards(JwtAuthGuard)
    @Get('overview')
    getOverview(@Req() req: Request & { user: any }) {
        const { sub, role } = req.user;
        return this.userService.getOverview(sub, role);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfileDetails(@Req() req: Request & { user: any }) {
        const { sub, role } = req.user;
        return this.userService.getProfileDetails(sub, role);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('profile')
    updateProfile(@Req() req: Request & { user: any }, @Body() updateUserProfileDto: UpdateUserProfileDto) {
        const { sub, role } = req.user;
        return this.userService.updateProfile(sub, role, updateUserProfileDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('supervisor')
    getStudentsSupervisors(@Req() req: Request & { user: any }) {
        const { sub } = req.user;
        return this.userService.getStudentsSupervisors(sub);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('supervisor/:supervisorUserId')
    removeSupervisorById(@Param('supervisorUserId') supervisorUserId: string, @Req() req: Request & { user: any }) {
        const { sub } = req.user;
        return this.userService.removeSupervisorById(sub, supervisorUserId);
    }

    @UseGuards(JwtAuthGuard)
    @Get('supervisor/industry')
    getIndustrySupervisorStudents(@Req() req: Request & { user: any }) {
        const { sub } = req.user;
        return this.userService.getIndustrySupervisorStudents(sub);
    }

    @UseGuards(JwtAuthGuard)
    @Get('supervisor/school')
    getSchoolSupervisorStudents(@Req() req: Request & { user: any }) {
        const { sub } = req.user;
        return this.userService.getSchoolSupervisorStudents(sub);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('supervisor/industry')
    assignIndustrySupervisor(@Req() req: Request & { user: any }, @Body() addInustrySupervisorDto: AddInustrySupervisorDto) {
        const { sub } = req.user;
        return this.userService.assignIndustrySupervisor(sub, addInustrySupervisorDto);
    }
    
    // @UseGuards(JwtAuthGuard)
    // @Delete('supervisor/industry')
    // removeIndustrySupervisor(@Req() req: Request & { user: any }) {
    //     const { sub } = req.user;
    //     return this.userService.removeIndustrySupervisor(sub);
    // }

    // @UseGuards(JwtAuthGuard)
    // @Delete('supervisor/school')
    // removeSchoolSupervisor(@Req() req: Request & { user: any }) {
    //     const { sub } = req.user;
    //     return this.userService.removeSchoolSupervisor(sub);
    // }

    @UseGuards(JwtAuthGuard)
    @Patch('supervisor/school')
    assignSchoolSupervisor(@Req() req: Request & { user: any }, @Body() addSchoolSupervisorDto: AddSchoolSupervisorDto) {
        const { sub } = req.user;
        return this.userService.assignSchoolSupervisor(sub, addSchoolSupervisorDto);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('supervisor/industry/transfer')
    transferStudentsToNewIndustrySupervisor(@Body() transferStudentsToNewIndustrySupervisorDto: TransferStudentsToNewIndustrySupervisorDto) {
        return this.userService.transferStudentsToNewIndustrySupervisor(transferStudentsToNewIndustrySupervisorDto);
    }
}