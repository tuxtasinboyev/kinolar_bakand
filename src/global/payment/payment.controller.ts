import { Controller, Get, Delete, Req, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { GuardService } from 'src/core/guard/guard.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Payment')
@ApiBearerAuth()
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) { }

  @UseGuards(GuardService)
  @Get('all-payment')
  @ApiOperation({ summary: 'Get all payment history for current user' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved payment history' })
  findAll(@Req() req) {
    const user_id = req['id'];
    return this.paymentService.findAll(user_id);
  }

  @UseGuards(GuardService)
  @Delete('delete-paytment-history')
  @ApiOperation({ summary: 'Delete all payment history for current user' })
  @ApiResponse({ status: 200, description: 'Successfully deleted payment history' })
  remove(@Req() req) {
    const user_id = req['id'];
    return this.paymentService.remove(user_id);
  }
}
