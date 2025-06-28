import { PartialType } from '@nestjs/swagger';
import { CreateSubscriptionPlanDto } from './create-subscriptio_plan.dto';

export class UpdateSubscriptioPlanDto extends PartialType(CreateSubscriptionPlanDto) {}
