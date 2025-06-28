import { PartialType } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-category.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
    @IsOptional()
    @IsString()
    @ApiPropertyOptional({
        example: 'New category name',
        description: 'Optional new name for the category',
    })
    name?: string;

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({
        example: 'new-slug',
        description: 'Optional new slug for the category',
    })
    slug?: string;

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({
        example: 'Updated description of the category',
        description: 'Optional new description',
    })
    description?: string;
}
