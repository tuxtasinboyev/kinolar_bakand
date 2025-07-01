import { SubscriptionType } from '@prisma/client';
import {
  IsBoolean,
  IsNumber,
  IsString,
  IsArray,
  IsNotEmpty,
  IsEnum,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSubscriptionPlanDto {
  @ApiProperty({
    enum: SubscriptionType,
    example: SubscriptionType.premium,
    description: 'Subscription plan type (FREE, STANDARD, PREMIUM, etc.)',
  })
  @IsEnum(SubscriptionType)
  name: SubscriptionType;

  @ApiProperty({
    example: 49.99,
    description: 'Price of the subscription plan (e.g., 49.89 format)',
  })
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'price must be 49.89 format' })
  price: number;

  @ApiProperty({
    example: 30,
    description: 'Duration of the subscription plan in days',
  })
  @IsNumber()
  duration_days: number;

  @ApiProperty({
    example: [
      { reclama: false },
      { download: true }
    ]
  })
  @IsArray()
  features: string[];

  @ApiProperty({
    example: true,
    description: 'Whether the subscription plan is active or not',
  })
  @IsBoolean()
  is_active: boolean;
}
