import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateSuperAdminDto {
  @ApiProperty({
    example: 'adminMaster',
    description: 'Username of the super admin',
  })
  @IsString()
  username: string;

  @ApiProperty({
    example: 'admin@example.com',
    description: 'Email address of the super admin',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'StrongPassword123!',
    description: 'Password for the super admin account',
  })
  @IsString()
  password_hash: string;
}
