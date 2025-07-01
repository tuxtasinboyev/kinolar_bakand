import { IsEmail, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
    @IsEmail()
    @ApiProperty({
        example: 'omadbektuxtasinboyev06@gmail.com',
        description: 'Email address of the user'
    })
    email: string;

    @IsString()
    @ApiProperty({
        example: 'OMADBEK007',
        description: 'User password (hashed or plain, depending on flow)'
    })
    password_hash: string;
}
