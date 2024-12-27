import { IsEmail, IsNotEmpty, MinLength, IsEnum, IsOptional, ValidateIf, min, minLength, Min, IsString, IsArray } from 'class-validator';
import { Role } from '@prisma/client'; // Import Prisma Role Enum
import { Optional } from '@nestjs/common';

export class AddInustrySupervisorDto {
  @IsEmail()
  @IsNotEmpty({ message: 'Supervisors email is required' })
  email: string;
}

export class AddSchoolSupervisorDto {
  @IsEmail()
  @IsNotEmpty({ message: 'Supervisors email is required' })
  email: string;
}

export class TransferStudentsToNewIndustrySupervisorDto {
  @IsEmail()
  @IsNotEmpty({ message: 'Supervisors email is required' })
  email: string;

  @IsArray({ message: 'Student ids must be an array of strings' })
  @IsNotEmpty({ message: 'Student ids are required' })
  studentIds: string[];
}

export class UpdateUserProfileDto {
  @IsNotEmpty()
  @MinLength(3, { message: 'firstName must be at least 3 characters long' })
  @IsString({ message: 'firstName must be a string.' })
  firstName: string;

  @IsOptional()
  @IsString({ message: 'middleName must be a string.' })
  middleName: string;

  @IsNotEmpty()
  @MinLength(3, { message: 'lastName must be at least 3 characters long' })
  @IsString({ message: 'lastName must be a string.' })
  lastName: string;

  // @IsEmail()
  // @IsNotEmpty()
  // email: string;

  // COMMON Fields
  @ValidateIf((o) => o.role === Role.SCHOOL_SUPERVISOR)
  @IsNotEmpty({ message: 'Faculty is required for School Supervisors.' })
  @IsString({ message: 'Faculty must be a string.' })
  @ValidateIf((o) => o.role === Role.STUDENT || o.role === Role.SCHOOL_SUPERVISOR)
  faculty?: string;

  // STUDENT Fields
  @ValidateIf((o) => o.role === Role.STUDENT)
  @IsOptional()
  @IsString({ message: 'matricNo must be a string.' })
  matricNo?: string;

  @ValidateIf((o) => o.role === Role.STUDENT)
  @Optional()
  @IsString({ message: 'Institution must be a string.' })
  institution?: string;

  @ValidateIf((o) => o.role === Role.STUDENT)
  @Optional()
  @IsString({ message: 'department must be a string.' })
  department?: string;

  // INDUSTRY_SUPERVISOR Fields
  @ValidateIf((o) => o.role === Role.INDUSTRY_SUPERVISOR)
  @IsNotEmpty({ message: 'Company name is required for INDUSTRY_SUPERVISOR role' })
  @IsString({ message: 'companyName must be a string.' })
  companyName?: string;

  @ValidateIf((o) => o.role === Role.INDUSTRY_SUPERVISOR)
  @IsNotEmpty({ message: 'Position is required for INDUSTRY_SUPERVISOR role' })
  @IsString({ message: 'position must be a string.' })
  position?: string;

  // SCHOOL_SUPERVISOR Fields
  @ValidateIf((o) => o.role === Role.SCHOOL_SUPERVISOR)
  @IsNotEmpty({ message: 'Position is required for SCHOOL_SUPERVISOR role' })
  @IsString({ message: 'schoolPosition must be a string.' })
  schoolPosition?: string;
}