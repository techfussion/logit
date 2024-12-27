import { IsString, IsNotEmpty, MaxLength, IsDateString, IsNumber, IsOptional } from "class-validator";

export class CreateLogDto {
    @IsNotEmpty({ message: 'Log content is required' })
    @MaxLength(500, { message: 'Log content must not exceed 500 characters' })
    @IsString()
    description: string;

    @IsNotEmpty({ message: 'Clock in time is required' })
    @IsDateString()
    clockInTime: Date;

    @IsNotEmpty({ message: 'Log week is required e.g 1' })
    @IsNumber()
    logWeek: number;

    @IsNotEmpty({ message: 'Log day is required e.g Monday' })
    @IsString()
    logDay: string;
  }

export class UpdateLogDto {
    @IsOptional()
    @MaxLength(500, { message: 'Log content must not exceed 500 characters' })
    @IsString()
    description: string;

    @IsOptional()
    @IsDateString()
    clockInTime?: Date;

    @IsOptional()
    @IsNumber()
    logWeek: number;

    @IsOptional()
    @IsString()
    logDay: string;
}
  