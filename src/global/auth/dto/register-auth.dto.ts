import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateAuthDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'john_doe',
    description: 'Unique username for the user'
  })
  username: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'john@example.com',
    description: 'User email address'
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'StrongPassword123!',
    description: 'Plain text password (will be hashed on backend)'
  })
  password: string;
}
