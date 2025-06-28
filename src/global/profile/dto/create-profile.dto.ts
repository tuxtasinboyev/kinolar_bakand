import { IsNotEmpty, IsString, Matches } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateProfileDto {
    @ApiProperty({
        example: 'Aliyev Valijon',
        description: 'Full name of the user'
    })
    @IsString()
    @IsNotEmpty()
    full_name: string;

    @ApiProperty({
        example: '+998901234567',
        description: 'Phone number in international format'
    })
    @IsString()
    @Matches(/^(\+?\d{0,3})?(\d{9})$/, {
        message: 'Phone number is invalid',
    })
    phone: string;

    @ApiProperty({
        example: 'Uzbekistan',
        description: 'Country name'
    })
    @IsString()
    @IsNotEmpty()
    country: string;
}
