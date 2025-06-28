import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: 'Action',
        description: 'Name of the category',
    })
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: 'action',
        description: 'Slug (URL-friendly name) of the category',
    })
    slug: string;

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({
        example: 'All action genre movies',
        description: 'Optional description of the category',
    })
    description?: string;
}
