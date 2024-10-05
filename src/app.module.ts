import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StripePaymentModule } from './stripe_payment/stripe_payment.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [StripePaymentModule, ConfigModule.forRoot({
      isGlobal: true,
    }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
