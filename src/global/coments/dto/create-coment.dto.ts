import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateComentDto {
    @ApiProperty({
        example: 5,
        description: 'Rating value from 1 to 5',
    })
    @IsNumber()
    rating: number;

    @ApiProperty({
        example: 'An amazing movie with great visuals and storyline!',
        description: 'The review text written by the user about the movie',
    })
    @IsString()
    comment: string;
}
