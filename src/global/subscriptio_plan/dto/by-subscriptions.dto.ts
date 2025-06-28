import { ApiProperty } from '@nestjs/swagger';
import { PaymentMethod } from '@prisma/client';

export class PurchaseSubscriptionDto {
    @ApiProperty({
        example: 'a3e84d52-9b6c-4dc0-a786-4aee3d8c2132',
        description: 'The ID of the subscription plan (UUID format)',
    })
    plan_id: string;

    @ApiProperty({
        enum: PaymentMethod,
        example: PaymentMethod.paypal,
        description: 'The payment method to use (e.g. CLICK, PAYME, STRIPE, PAYPAL, etc.)',
    })
    payment_method: PaymentMethod;

    @ApiProperty({
        example: true,
        description: 'Whether the subscription should auto-renew or not',
    })
    auto_renew: boolean;

    @ApiProperty({
        example: {
            card_number: '8600123412341234',
            expiry: '12/26',
            card_holder: 'Ali Valiyev'
        },
        description: 'Payment details such as card number, expiry date, etc.',
        type: Object,
    })
    payment_details: object;
}
