import { IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateWatchHistoryDto {
    @ApiProperty({
        example: 'a3e84d52-9b6c-4dc0-a786-4aee3d8c2132',
        description: 'The UUID of the movie being watched',
    })
    @IsString()
    movieId: string;

    @ApiProperty({
        example: 145,
        description: 'The number of seconds watched by the user',
    })
    @IsNumber()
    watchedDuration: number;

    @ApiProperty({
        example: 72.5,
        description: 'The percentage of the movie watched (0 - 100)',
    })
    @IsNumber()
    watchedPercentage: number;
}
