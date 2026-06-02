import { IsEmail, IsNotEmpty, IsString, MinLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'Admin Devlivery', description: 'Full name' })
  @IsString({ message: 'Nama harus berupa teks' })
  @IsNotEmpty({ message: 'Nama lengkap tidak boleh kosong' })
  name: string;

  @ApiProperty({ example: 'admin@devlivery.tech', description: 'User email address' })
  @IsEmail({}, { message: 'Format email tidak valid' })
  @IsNotEmpty({ message: 'Email tidak boleh kosong' })
  email: string;

  @ApiProperty({ example: 'devliverypassword', description: 'User password (min 8 characters)' })
  @IsString({ message: 'Kata sandi harus berupa teks' })
  @MinLength(8, { message: 'Kata sandi minimal harus 8 karakter' })
  password: string;

  @ApiProperty({ example: 'Devlivery Inc', description: 'Organization name' })
  @IsString({ message: 'Nama organisasi harus berupa teks' })
  @IsNotEmpty({ message: 'Nama organisasi tidak boleh kosong' })
  orgName: string;

  @ApiProperty({ example: 'devlivery-inc', description: 'Organization slug (kebab-case)' })
  @IsString({ message: 'Slug organisasi harus berupa teks' })
  @IsNotEmpty({ message: 'Slug organisasi tidak boleh kosong' })
  @Matches(/^[a-z0-9-]+$/, {
    message: 'Slug hanya boleh berisi huruf kecil, angka, dan tanda hubung (kebab-case)',
  })
  orgSlug: string;
}