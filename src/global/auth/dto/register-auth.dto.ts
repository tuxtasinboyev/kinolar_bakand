import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateAuthDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'omadbeka',
    description: 'Unique username for the user'
  })
  username: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'omadbektuxtasinboyev06@gmail.com',
    description: 'User email address'
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'OMADBEK007!',
    description: 'Plain text password (will be hashed on backend)'
  })
  password_hash: string;
}
