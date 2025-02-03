import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AddInustrySupervisorDto, AddSchoolSupervisorDto, TransferStudentsToNewIndustrySupervisorDto, UpdateUserProfileDto } from "./dto/user.dto";
import { Role } from '@prisma/client';

type ProfileType = {
  studentProfile?: { id: string } | null;
  industrySupervisorProfile?: { id: string } | null;
  schoolSupervisorProfile?: { id: string } | null;
};

type ProfileSelections = {
  [key in Role]?: {
    select: Record<string, boolean>;
    errorMessage: string;
  };
};

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    private readonly profileSelections: ProfileSelections = {
      STUDENT: {
          select: { studentProfile: true },
          errorMessage: 'Student'
      },
      INDUSTRY_SUPERVISOR: {
          select: { industrySupervisorProfile: true },
          errorMessage: 'Industry Supervisor'
      },
      SCHOOL_SUPERVISOR: {
          select: { schoolSupervisorProfile: true },
          errorMessage: 'School Supervisor'
      }
    };

    async getOverview(userId: string, role: string) {
        try {            
            if (role === "STUDENT") {
              const { studentProfile } = await this.prisma.user.findUnique({
                where: { id: userId },
                select: {
                  studentProfile: true,
                }
              });
              
              // get the number of logweeks filled
              const logWeeks = await this.prisma.logEntry.findMany({
                where: { studentId: studentProfile.id },
                select: { logWeek: true }
              });

              // get the number of logs with feedback
              const feedbacks = await this.prisma.feedback.findMany({
                where: { logEntry: { studentId: studentProfile.id } }
              });

              return {
                supervisors: +!!studentProfile.industrySupervisorId + +!!studentProfile.schoolSupervisorId,
                totalLogs: logWeeks.length,
                totalFeedbacks: feedbacks.length
              };
            } else if (role === "INDUSTRY_SUPERVISOR") {
              const { industrySupervisorProfile } = await this.prisma.user.findUnique({
                where: { id: userId },
                select: {
                  industrySupervisorProfile: true,
                }
              });

              // get the number of interns supervised
              const interns = await this.prisma.student.findMany({
                where: { industrySupervisorId: industrySupervisorProfile.id }
              });

              // get the number of logs filled by interns
              const logs = await this.prisma.logEntry.findMany({
                where: { student: { industrySupervisorId: industrySupervisorProfile.id } }
              });

              // get the number of feedbacks submitted
              const feedbacks = await this.prisma.feedback.findMany({
                where: { industrySupervisorId: industrySupervisorProfile.id }
              });

              return {
                interns: interns.length,
                totalLogs: logs.length,
                totalFeedbacks: feedbacks.length
              };
            } else if (role === "SCHOOL_SUPERVISOR") { 
              const { schoolSupervisorProfile } = await this.prisma.user.findUnique({
                where: { id: userId },
                select: {
                  schoolSupervisorProfile: true,
                }
              });

              // get the number of students supervised
              const students = await this.prisma.student.findMany({
                where: { schoolSupervisorId: schoolSupervisorProfile.id }
              });

              // get the number of logs filled by students
              const logs = await this.prisma.logEntry.findMany({
                where: { student: { schoolSupervisorId: schoolSupervisorProfile.id } }
              });

              // get the number of feedbacks submitted
              const feedbacks = await this.prisma.feedback.findMany({
                where: { schoolSupervisorId: schoolSupervisorProfile.id }
              });

              return {
                students: students.length,
                totalLogs: logs.length,
                totalFeedbacks: feedbacks.length
              };
            }

            throw new NotFoundException(`Role ${role} not recognized`);
        } catch (error) {
            throw new Error(`Failed to fetch overview: ${error.message}`);
        }
    }
   
    async getProfileDetails(id: string, role: Role) {
      try {
          const profileConfig = this.profileSelections[role];
          
          if (!profileConfig) {
              throw new NotFoundException(`Role ${role} not recognized`);
          }

          const user = await this.prisma.user.findUnique({
              where: { id },
              select: profileConfig.select
          });

          if (!user) {
              throw new NotFoundException(`User with ID ${id} not found`);
          }

          let profile;
          switch (role) {
              case 'STUDENT':
                  profile = user.studentProfile;
                  break;
              case 'INDUSTRY_SUPERVISOR':
                  profile = user.industrySupervisorProfile;
                  break;
              case 'SCHOOL_SUPERVISOR':
                  profile = user.schoolSupervisorProfile;
                  break;
          }

          if (!profile) {
              throw new NotFoundException(
                  `${profileConfig.errorMessage} profile with user ID ${id} not found`
              );
          }

          return profile;

      } catch (error) {
          if (error instanceof NotFoundException) {
              throw error;
          }
          throw new Error(`Failed to fetch profile details: ${error.message}`);
      }
    }

    async updateProfile(userId: string, role: Role, updateUserProfileDto: UpdateUserProfileDto) {
      // Remove undefined fields from the update data
      const data = Object.fromEntries(
          Object.entries(updateUserProfileDto).filter(([_, value]) => value !== undefined)
      );

      // Get the correct profile based on role
      const profile = await this.prisma.user.findUnique({
          where: { id: userId },
          select: {
              studentProfile: role === 'STUDENT',
              industrySupervisorProfile: role === 'INDUSTRY_SUPERVISOR',
              schoolSupervisorProfile: role === 'SCHOOL_SUPERVISOR'
          }
      }) as ProfileType;

      if (!profile) {
          throw new NotFoundException(`User with ID ${userId} not found`);
      }

      let profileId: string | undefined;

      switch (role) {
          case 'STUDENT':
              profileId = profile.studentProfile?.id;
              break;
          case 'INDUSTRY_SUPERVISOR':
              profileId = profile.industrySupervisorProfile?.id;
              break;
          case 'SCHOOL_SUPERVISOR':
              profileId = profile.schoolSupervisorProfile?.id;
              break;
          default:
              throw new NotFoundException(`Role ${role} not recognized`);
      }

      if (!profileId) {
          throw new NotFoundException(`Profile for user ${userId} with role ${role} not found`);
      }

      try {
          switch (role) {
              case 'STUDENT':
                  return await this.prisma.student.update({
                      where: { id: profileId },
                      data
                  });
              case 'INDUSTRY_SUPERVISOR':
                  return await this.prisma.industrySupervisor.update({
                      where: { id: profileId },
                      data
                  });
              case 'SCHOOL_SUPERVISOR':
                  return await this.prisma.schoolSupervisor.update({
                      where: { id: profileId },
                      data
                  });
          }
      } catch (error) {
          if (error.code === 'P2025') {
              throw new NotFoundException(`Profile with ID ${profileId} not found`);
          }
          throw new Error(`Failed to update profile: ${error.message}`);
      }
    }

    async assignIndustrySupervisor(userId: string, addInustrySupervisorDto: AddInustrySupervisorDto) {
      const { email } = addInustrySupervisorDto;

      try {
        const { industrySupervisorProfile } = await this.prisma.user.findUnique({
          where: { email },
          select: { industrySupervisorProfile: true }
        });

        if (!industrySupervisorProfile) {
          throw new NotFoundException(`Industry supervisor with email ${email} not found`);
        }

        const { studentProfile } = await this.prisma.user.findUnique({
          where: { id: userId },
          select: { studentProfile: true }
        });

        if (!studentProfile) {
          throw new NotFoundException(`Couldn't retrieve student info for processing`);
        }

        const updatedStudent = await this.prisma.student.update({
          where: { id: studentProfile.id },
          data: {
            industrySupervisorId: industrySupervisorProfile?.id
          },
          include: {
            industrySupervisor: true
          }
        });

        return updatedStudent;
      } catch (error) {
        throw new Error(`Failed to assign industry supervisor: ${error.message}`);
      }
    }

      // Remove supervisor by Id
      async removeSupervisorById(userId: string, supervisorUserId: string) {
        const { studentProfile } = await this.prisma.user.findUnique({
          where: { id: userId },
          select: { studentProfile: true }
        });

        const supervisorRole = await this.prisma.user.findUnique({
          where: { id: supervisorUserId },
          select: { role: true }
        });
  
        try {
          const updatedStudent = await this.prisma.student.update({
            where: { id: studentProfile.id },
            data: supervisorRole.role === "INDUSTRY_SUPERVISOR" 
              ? { industrySupervisorId: null }
              : { schoolSupervisorId: null }
          });
          
          return updatedStudent;
        } catch (error) {
          throw new Error(`Failed to remove industry supervisor: ${error.message}`);
        }
      }
  
    // Remove an industry supervisor from a student
    async removeIndustrySupervisor(userId: string) {
      const { studentProfile } = await this.prisma.user.findUnique({
        where: { id: userId },
        select: { studentProfile: true }
      });

      try {
        const updatedStudent = await this.prisma.student.update({
          where: { id: studentProfile.id },
          data: {
            industrySupervisorId: null
          }
        });
        
        return updatedStudent;
      } catch (error) {
        throw new Error(`Failed to remove industry supervisor: ${error.message}`);
      }
    }
  
    // Assign a school supervisor to a student
    async assignSchoolSupervisor(userId: string, addSchoolSupervisorDto: AddSchoolSupervisorDto) {
      const { email } = addSchoolSupervisorDto;

      try {
        const { schoolSupervisorProfile } = await this.prisma.user.findUnique({
          where: { email },
          select: { schoolSupervisorProfile: true }
        });

        if (!schoolSupervisorProfile) {
          throw new NotFoundException(`School supervisor with email ${email} not found`);
        }

        const { studentProfile } = await this.prisma.user.findUnique({
          where: { id: userId },
          select: { studentProfile: true }
        });

        if (!studentProfile) {
          throw new NotFoundException(`Couldn't retrieve id for student`);
        }

        const updatedStudent = await this.prisma.student.update({
          where: { id: studentProfile.id },
          data: {
            schoolSupervisorId: schoolSupervisorProfile?.id
          },
          include: {
            schoolSupervisor: true
          }
        });
        
        return updatedStudent;
      } catch (error) {
        throw new Error(`Failed to assign school supervisor: ${error.message}`);
      }
    }
  
    // Remove a school supervisor from a student
    async removeSchoolSupervisor(userId: string) {
      const { studentProfile } = await this.prisma.user.findUnique({
        where: { id: userId },
        select: { studentProfile: true }
      });

      try {
        const updatedStudent = await this.prisma.student.update({
          where: { id: studentProfile.id },
          data: {
            schoolSupervisorId: null
          }
        });
        
        return updatedStudent;
      } catch (error) {
        throw new Error(`Failed to remove school supervisor: ${error.message}`);
      }
    }

    // Get all supervisors for a paticular student
    async getStudentsSupervisors(userId: string) {
      if (!userId) {
        throw new Error("userId is required");
      }

      const { studentProfile } = await this.prisma.user.findUnique({
        where: { id: userId },
        select: { studentProfile: true }
      });

      try {
          const student = await this.prisma.student.findUnique({
              where: { id: studentProfile.id },
              include: { industrySupervisor: true, schoolSupervisor: true },
          });

          if (!student) {
              throw new NotFoundException(`Student with userId ${userId} not found`);
          }

          return [
            ...(student.industrySupervisor ? [student.industrySupervisor] : []),
            ...(student.schoolSupervisor ? [student.schoolSupervisor] : []),
          ];          
      } catch (error) {
          throw new Error(`Failed to retrieve supervisors: ${error.message}`);
      }
    }
  
    // Get all students supervised by an industry supervisor
    async getIndustrySupervisorStudents(userId: string) {
      const { id } = await this.prisma.industrySupervisor.findUnique({
        where: { userId },
        select: { id: true }
      });

      try {
        const students = await this.prisma.student.findMany({
          where: {
            industrySupervisorId: id
          },
          include: {
            industrySupervisor: true,
            schoolSupervisor: true
          }
        });
        
        return students;
      } catch (error) {
        throw new Error(`Failed to fetch supervised students: ${error.message}`);
      }
    }
  
    // Get all students supervised by a school supervisor
    async getSchoolSupervisorStudents(userId: string) {
      const { id } = await this.prisma.schoolSupervisor.findUnique({
        where: { userId },
        select: { id: true }
      });

      try {
        const students = await this.prisma.student.findMany({
          where: {
            schoolSupervisorId: id
          },
          include: {
            industrySupervisor: true,
            schoolSupervisor: true
          }
        });
        
        return students;
      } catch (error) {
        throw new Error(`Failed to fetch supervised students: ${error.message}`);
      }
    }
  
    // Transfer multiple students to a new industry supervisor
    async transferStudentsToNewIndustrySupervisor(transferStudentsToNewIndustrySupervisorDto: TransferStudentsToNewIndustrySupervisorDto) {
      const { studentIds, email } = transferStudentsToNewIndustrySupervisorDto;
      
      try {
        const { industrySupervisorProfile } = await this.prisma.user.findUnique({
          where: { email },
          select: { industrySupervisorProfile: true }
        });

        if (!industrySupervisorProfile) {
          throw new NotFoundException(`Industry supervisor with email ${email} not found`);
        }

        const updatePromises = studentIds.map(studentId =>
          this.prisma.student.update({
            where: { id: studentId },
            data: {
              industrySupervisorId: industrySupervisorProfile?.id
            }
          })
        );
  
        const updatedStudents = await this.prisma.$transaction(updatePromises);
        return updatedStudents;
      } catch (error) {
        throw new Error(`Failed to transfer students: ${error.message}`);
      }
  }
}
