import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import { SubscriptioPlanService } from './subscriptio_plan.service';
import { CreateSubscriptionPlanDto } from './dto/create-subscriptio_plan.dto';
import { GuardService } from 'src/core/guard/guard.service';
import { Roles } from 'src/core/guard/role/role.decorator';
import { PurchaseSubscriptionDto } from './dto/by-subscriptions.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Subscription Plans')
@ApiBearerAuth()
@Controller('subscriptio-plan')
export class SubscriptioPlanController {
  constructor(private readonly subscriptioPlanService: SubscriptioPlanService) {}

  @UseGuards(GuardService)
  @Roles('superadmin', 'admin')
  @Post('create-subscription-plan')
  @ApiOperation({ summary: 'Create a new subscription plan' })
  @ApiBody({ type: CreateSubscriptionPlanDto })
  @ApiResponse({ status: 201, description: 'Subscription plan successfully created' })
  async create(@Body() createSubscriptioPlanDto: CreateSubscriptionPlanDto) {
    return this.subscriptioPlanService.create(createSubscriptioPlanDto);
  }

  @Get('getSubscription')
  @ApiOperation({ summary: 'Get all available subscription plans' })
  @ApiResponse({ status: 200, description: 'List of subscription plans retrieved' })
  async findAll() {
    return this.subscriptioPlanService.findAll();
  }

  @UseGuards(GuardService)
  @Roles('user')
  @Post('purchase-subcsription')
  @ApiOperation({ summary: 'Purchase a subscription plan' })
  @ApiBody({ type: PurchaseSubscriptionDto })
  @ApiResponse({ status: 201, description: 'Subscription successfully purchased' })
  async purcaseSubscription(@Req() req, @Body() payload: PurchaseSubscriptionDto) {
    const user_id = req['id'];
    return await this.subscriptioPlanService.subscriptionPurchase(payload, user_id);
  }
}
