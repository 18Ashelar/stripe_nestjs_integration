import { Module } from '@nestjs/common';
import { StripePaymentController } from './stripe_payment.controller';
import { StripePaymentService } from './stripe_payment.service';

@Module({
  controllers: [StripePaymentController],
  providers: [StripePaymentService]
})
export class StripePaymentModule {}
