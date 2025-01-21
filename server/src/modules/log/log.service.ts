import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { CreateLogDto, UpdateLogDto } from "./dto/log.dto";
import { PrismaService } from "../prisma/prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export class LogService {
  constructor(private readonly prisma: PrismaService) {}

  private async validateStudent(id: string) {
    const student = await this.prisma.student.findUnique({
      where: { id },
    });

    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }

    return student;
  }

  private async validateLog(id: string) {
    const log = await this.prisma.logEntry.findUnique({
      where: { id },
    });

    if (!log) {
      throw new NotFoundException(`Log with ID ${id} not found`);
    }

    return log;
  }

  async getAllUserLogs(userId: string) {
    try {
      const { studentProfile } = await this.prisma.user.findFirst({
        where: { id: userId },
        select: {
          studentProfile: true,
        }
      });

      if (!studentProfile) {
        throw new NotFoundException(`Student with userId ${userId} not found`);
      }

      const logs = await this.prisma.logEntry.findMany({
        where: { studentId: studentProfile.id },
        orderBy: {
          logWeek: 'asc',
        },
      });

      // group logs by week
      const groupedLogs = logs.reduce((acc, log) => {
        if (!acc[log.logWeek]) {
          acc[log.logWeek] = [];
        }
        acc[log.logWeek].push(log);
        return acc;
      }, {});

      return groupedLogs;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new BadRequestException('Database operation failed');
      }
      throw error;
    }
  }

  async getLogsByWeek(studentId: string, week: number) {
    try {
      await this.validateStudent(studentId);

      return await this.prisma.logEntry.findMany({
        where: {
          studentId,
          logWeek: week,
        },
        orderBy: {
          logDay: 'asc',
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new BadRequestException('Database operation failed');
      }
      throw error;
    }
  }

  async createLog(userId: string, createLogDto: CreateLogDto) {
    const { description, clockInTime, logWeek, logDay } = createLogDto;

    const { studentProfile } = await this.prisma.user.findFirst({
      where: { id: userId },
      select: {
        studentProfile: true,
      }
    });

    try {
      await this.validateStudent(studentProfile.id);

      const existingLog = await this.prisma.logEntry.findFirst({
        where: {
          studentId: studentProfile.id,
          logWeek,
          logDay,
        },
      });

      if (existingLog) {
        throw new BadRequestException(
          'Log entry already exists for this student on the specified day and week'
        );
      }

      return await this.prisma.logEntry.create({
        data: {
          description,
          studentId: studentProfile.id,
          clockInTime,
          logWeek,
          logDay,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new BadRequestException('Database operation failed');
      }
      throw error;
    }
  }

  async updateLog(id: string, updateLogDto: UpdateLogDto) {
    try {
      await this.validateLog(id);

      return await this.prisma.logEntry.update({
        where: { id },
        data: updateLogDto,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new BadRequestException('Database operation failed');
      }
      throw error;
    }
  }

  async deleteLog(id: string) {
    try {
      await this.validateLog(id);

      return await this.prisma.logEntry.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new BadRequestException('Database operation failed');
      }
      throw error;
    }
  }
}