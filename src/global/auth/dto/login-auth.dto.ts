import { IsEmail, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
    @IsEmail()
    @ApiProperty({
        example: 'user@example.com',
        description: 'Email address of the user'
    })
    email: string;

    @IsString()
    @ApiProperty({
        example: 'mySecurePassword123',
        description: 'User password (hashed or plain, depending on flow)'
    })
    password_hash: string;
}
