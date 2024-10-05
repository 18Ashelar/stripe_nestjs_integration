import { Body, Controller, HttpException, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { StripePaymentService } from './stripe_payment.service';
import Stripe from 'stripe';
import { Request, Response } from 'express';


@Controller('stripe-payment')
export class StripePaymentController {


constructor(private stripePaymentService: StripePaymentService) {}

  @Post('create-payment-intent')
  async createPaymentIntent(@Body() body: { amount: number; currency: string }) {
    const paymentIntent = await this.stripePaymentService.createPaymentIntent(
      body.amount,
      body.currency,
    );
    return { clientSecret: paymentIntent.client_secret };
  }


  @Post('webhook')
  async handleStripeWebhook(@Req() req: Request, @Res() res: Response) {
    const signature = req.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET; // Load this from your environment variables
    let event: Stripe.Event;

    try {
      // Stripe requires the raw body for signature verification, so ensure it's correctly passed
      event = this.stripePaymentService.stripe.webhooks.constructEvent(
        req.body, // Attach the raw body (see Middleware step below)
        signature,
        webhookSecret,
      );
    } catch (err) {
      console.error(
        `⚠️  Webhook signature verification failed: ${err.message}`,
      );
      throw new HttpException(
        'Webhook signature verification failed.',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Handle the Stripe event
    switch (event.type) {
      // Payment success
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log(paymentIntent);
        break;

      case 'payment_intent.payment_failed':
        // Payment failed
        const failedIntent = event.data.object as Stripe.PaymentIntent;
        console.log(failedIntent);
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Respond to Stripe to acknowledge receipt of the event
    res.json({ received: true });
  }
}
