import { Injectable } from '@nestjs/common';
import { CreateSubscriptionPlanDto } from './dto/create-subscriptio_plan.dto';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CustomErrorService } from 'src/core/custom-error/custom-error.service';
import { PurchaseSubscriptionDto } from './dto/by-subscriptions.dto';

@Injectable()
export class SubscriptioPlanService {
  constructor(private prisma: PrismaService, private customError: CustomErrorService) { }
  async create(createSubscriptioPlanDto: CreateSubscriptionPlanDto) {
    const result = await this.prisma.subscription_plans.create(
      {
        data: {
          name: createSubscriptioPlanDto.name,
          price: createSubscriptioPlanDto.price,
          duration_days: createSubscriptioPlanDto.duration_days,
          features: createSubscriptioPlanDto.features,
          is_active: createSubscriptioPlanDto.is_active
        }
      })
    return {
      success: true,
      data: result,
    }

  }


  async findAll() {
    const result = await this.prisma.subscription_plans.findMany()
    const total = await this.prisma.subscription_plans.count()
    return {
      success: true,
      data: result,
      total

    }
  }
  async subscriptionPurchase(payload: PurchaseSubscriptionDto, user_id: string) {
    const plans = await this.customError.findBySubsicriptId(payload.plan_id)

    const plan = await this.prisma.subscription_plans.findUniqueOrThrow({
      where: { id: payload.plan_id },
    });
    const startDate = new Date()
    const endDate = new Date()
    endDate.setDate(startDate.getDate() + plan.duration_days)
    const UserSubscriptionCreate = await this.prisma.userSubscription.create({
      data: {
        autoRenew: payload.auto_renew,
        planId: payload.plan_id,
        userId: user_id,
        startDate,
        endDate,
        status: 'active'
      }
    })
    const purchasePayments = await this.prisma.payment.create({
      data:
      {
        paymentMethod: payload.payment_method,
        amount: plans.price,
        status: 'completed',
        paymentDetails: payload.payment_details,
        userSubscriptionId: UserSubscriptionCreate.id
      }
    })
    return {
      success: true,
      message: "the subscription by successfully",
      data: {
        id: UserSubscriptionCreate.id,
        plan: {
          id: plans.id,
          name: plans.name
        },
        startDate: UserSubscriptionCreate.startDate,
        endDate: UserSubscriptionCreate.endDate,
        status: UserSubscriptionCreate.status,
        auto_renew: UserSubscriptionCreate.autoRenew
      },
      payment: {
        id: purchasePayments.id,
        amount: purchasePayments.amount,
        status: purchasePayments.status,
        external_transaction_id: purchasePayments.externalTransactionId,
        payment_method: purchasePayments.paymentMethod
      }
    }
  }


}
