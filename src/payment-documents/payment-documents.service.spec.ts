import { Test, TestingModule } from '@nestjs/testing';
import { PaymentDocumentsService } from './payment-documents.service';

describe('PaymentDocumentsService', () => {
  let service: PaymentDocumentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentDocumentsService],
    }).compile();

    service = module.get<PaymentDocumentsService>(PaymentDocumentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
