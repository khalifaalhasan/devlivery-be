import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, IsOptional, IsObject } from 'class-validator';

export class SubmitFormDto {
  @ApiProperty({ example: 'johndoe@example.com' })
  @IsEmail()
  @IsNotEmpty()
  respondentEmail: string;

  @ApiProperty({ example: 'John Doe', required: false })
  @IsString()
  @IsOptional()
  respondentName?: string;

  @ApiProperty({
    example: {
      full_name: 'John Doe',
      company: 'Tech Corp',
    },
    description: 'Key-value pairs matching the fieldKey from the form schema',
  })
  @IsObject()
  @IsNotEmpty()
  answers: Record<string, any>;
}
