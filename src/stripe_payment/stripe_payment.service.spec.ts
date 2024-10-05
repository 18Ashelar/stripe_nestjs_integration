import { Test, TestingModule } from '@nestjs/testing';
import { StripePaymentService } from './stripe_payment.service';

describe('StripePaymentService', () => {
  let service: StripePaymentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StripePaymentService],
    }).compile();

    service = module.get<StripePaymentService>(StripePaymentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
