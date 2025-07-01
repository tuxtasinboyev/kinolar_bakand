import { IsBoolean, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePermissionDto {
    @ApiProperty({
        description: 'The ID of the user to assign permissions to',
        example: '550e8400-e29b-41d4-a716-446655440000',
    })
    @IsUUID()
    userId: string;

    @ApiPropertyOptional({
        description: 'Allow read access',
        example: true,
        default: false,
    })
    @IsOptional()
    @IsBoolean()
    can_read?: boolean;

    @ApiPropertyOptional({
        description: 'Allow create/add access',
        example: true,
        default: false,
    })
    @IsOptional()
    @IsBoolean()
    can_add?: boolean;

    @ApiPropertyOptional({
        description: 'Allow update access',
        example: false,
        default: false,
    })
    @IsOptional()
    @IsBoolean()
    can_update?: boolean;

    @ApiPropertyOptional({
        description: 'Allow delete access',
        example: false,
        default: false,
    })
    @IsOptional()
    @IsBoolean()
    can_delete?: boolean;
}
