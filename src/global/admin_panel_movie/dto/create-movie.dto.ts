import { IsNotEmpty, IsNumber, IsString, IsArray, ArrayNotEmpty, IsUUID, IsOptional } from 'class-validator';
import { Transform, Type } from 'class-transformer';
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

  @Transform((e) => {
    if (Array.isArray(e.value)) {
      return e.value
    }
    return e.value.split(",")
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('all', { each: true })
  category_ids: string[]
}
