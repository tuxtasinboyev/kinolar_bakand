import { IsNotEmpty, IsNumber, IsString, IsArray, ArrayNotEmpty, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMovieDto {
  @ApiProperty({
    example: 'Avengers: Endgame',
    description: 'Movie title'
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'Epic final battle to save the universe',
    description: 'Movie description'
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: 2019,
    description: 'Year the movie was released'
  })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  release_year: number;

  @ApiProperty({
    example: 181,
    description: 'Movie duration in minutes'
  })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  duration_minutes: number;

  @ApiProperty({
    example: ['b0f3c44b-f33c-400b-9df1-5c611b2fb1d0', 'bfe3a227-e30f-4c7a-a89b-244cb45b17b1'],
    description: 'Array of category UUIDs',
    type: [String]
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('all', { each: true })
  category_ids: string[];
}
