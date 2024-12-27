import { IsString, IsNotEmpty, MaxLength } from "class-validator";

export class CreateFeedbackDto {
    @IsNotEmpty({ message: 'Log content is required' })
    @MaxLength(200, { message: 'Log content must not exceed 200 characters' })
    @IsString()
    content: string;

    @IsNotEmpty({ message: 'submittedBy ID is required' })
    @IsString()
    submittedById: string;

    @IsNotEmpty({ message: 'logEntry ID is required' })
    @IsString()
    logEntryId: string;
  }

export class UpdateFeedbackDto {
    @IsNotEmpty({ message: 'Log content is required' })
    @MaxLength(200, { message: 'Log content must not exceed 200 characters' })
    @IsString()
    content: string;

    @IsNotEmpty({ message: 'submittedBy ID is required' })
    @IsString()
    submittedById: string;

    @IsNotEmpty({ message: 'logEntry ID is required' })
    @IsString()
    logEntryId: string;
}
  