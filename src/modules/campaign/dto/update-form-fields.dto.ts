import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsBoolean, IsNumber, IsOptional, IsArray, ValidateNested, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';

export class FormFieldDto {
  @ApiProperty({ required: false, description: 'ID form field, abaikan jika ini field baru' })
  @IsString()
  @IsOptional()
  id?: string;

  @ApiProperty({ example: 'Nama Lengkap' })
  @IsString()
  @IsNotEmpty()
  label: string;

  @ApiProperty({ example: 'full_name' })
  @IsString()
  @IsNotEmpty()
  fieldKey: string;

  @ApiProperty({ example: 'text' })
  @IsString()
  @IsNotEmpty()
  fieldType: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  placeholder?: string;

  @ApiProperty({ default: true })
  @IsBoolean()
  @IsOptional()
  isRequired?: boolean;

  @ApiProperty({ default: 0 })
  @IsNumber()
  @IsOptional()
  sortOrder?: number;

  @ApiProperty({ required: false, type: [String] })
  @IsArray()
  @IsOptional()
  options?: any;

  @ApiProperty({ required: false })
  @IsOptional()
  validation?: Record<string, any>;
}

export class UpdateFormFieldsDto {
  @ApiProperty({ type: [FormFieldDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FormFieldDto)
  fields: FormFieldDto[];
}
