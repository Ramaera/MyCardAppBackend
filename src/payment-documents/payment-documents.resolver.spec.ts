import { Test, TestingModule } from '@nestjs/testing';
import { PaymentDocumentsResolver } from './payment-documents.resolver';
import { PaymentDocumentsService } from './payment-documents.service';

describe('PaymentDocumentsResolver', () => {
  let resolver: PaymentDocumentsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentDocumentsResolver, PaymentDocumentsService],
    }).compile();

    resolver = module.get<PaymentDocumentsResolver>(PaymentDocumentsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
