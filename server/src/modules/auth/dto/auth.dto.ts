import { IsEmail, IsString, IsNotEmpty, MinLength, IsEnum, IsOptional, ValidateIf, min, minLength, Min } from 'class-validator';
import { Role } from '@prisma/client'; // Import Prisma Role Enum

export class RegisterDto {
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

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @IsString()
  password: string;

  @IsEnum(Role, { message: 'Role must be STUDENT, INDUSTRY_SUPERVISOR, or SCHOOL_SUPERVISOR' })
  role: Role;
  // STUDENT Fields
  @ValidateIf((o) => o.role === Role.STUDENT)
  @IsNotEmpty({ message: 'Matric number is required for STUDENT role' })
  @IsString({ message: 'matricNo must be a string.' })
  matricNo?: string;

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
  @IsNotEmpty({ message: 'Faculty is required for SCHOOL_SUPERVISOR role' })
  @IsString({ message: 'faculty must be a string.' })
  faculty?: string;

  @ValidateIf((o) => o.role === Role.SCHOOL_SUPERVISOR)
  @IsNotEmpty({ message: 'Position is required for SCHOOL_SUPERVISOR role' })
  @IsString({ message: 'schoolPosition must be a string.' })
  schoolPosition?: string;
}


export class LoginDto {
  @IsEmail()
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}
