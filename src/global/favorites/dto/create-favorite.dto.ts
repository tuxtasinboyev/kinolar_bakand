import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateFavoriteDto {
    @ApiProperty({
        example: '550e8400-e29b-41d4-a716-446655440021',
        description: 'The UUID of the movie to be added to favorites'
    })
    @IsString()
    movie_id: string;
}
