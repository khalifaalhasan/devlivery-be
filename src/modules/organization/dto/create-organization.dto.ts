import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateOrganizationDto {
  @ApiProperty({ example: 'Komunitas Baru' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'komunitas-baru' })
  @IsString()
  @IsNotEmpty()
  slug: string;
}
