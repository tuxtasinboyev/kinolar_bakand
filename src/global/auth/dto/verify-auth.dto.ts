import { IsEmail, IsNotEmpty, IsNumber } from "class-validator";
import { Type } from 'class-transformer';
import { ApiProperty } from "@nestjs/swagger";

export class VerifyDto {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({
        example: 'user@example.com',
        description: 'Email address to verify'
    })
    email: string;

    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    @ApiProperty({
        example: 123456,
        description: 'Verification code sent to email'
    })
    code: number;
}
