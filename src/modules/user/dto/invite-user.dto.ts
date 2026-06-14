import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { Role } from 'src/common/enums/role.enum';

export class InviteUserDto {
  @ApiProperty({ example: 'colleague@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ enum: Role, example: Role.VIEWER })
  @IsEnum(Role)
  @IsNotEmpty()
  role: string;
}
