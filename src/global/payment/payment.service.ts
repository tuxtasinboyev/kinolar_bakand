import { Injectable } from '@nestjs/common';
import { CustomErrorService } from 'src/core/custom-error/custom-error.service';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService, private customError: CustomErrorService) { }

  async findAll(user_id: string) {
    await this.customError.findByUserId(user_id);

    const userSubscriptions = await this.prisma.userSubscription.findMany({
      where: { userId: user_id },
      select: { id: true }
    });

    const subscriptionIds = userSubscriptions.map(sub => sub.id);

    const result = await this.prisma.payment.findMany({
      where: { userSubscriptionId: { in: subscriptionIds } }
    });

    return {
      success: true,
      data: result
    };
  }

  async remove(user_id: string) {
    await this.customError.findByUserId(user_id);

    const userSubscriptions = await this.prisma.userSubscription.findMany({
      where: { userId: user_id },
      select: { id: true }
    });

    const subscriptionIds = userSubscriptions.map(sub => sub.id);

    await this.prisma.payment.deleteMany({
      where: { userSubscriptionId: { in: subscriptionIds } }
    });

    return {
      success: true,
      message: "Successfully deleted"
    };
  }

}
