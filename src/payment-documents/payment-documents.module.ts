import { Module } from '@nestjs/common';
import { PaymentDocumentsService } from './payment-documents.service';
import { PaymentDocumentsResolver } from './payment-documents.resolver';

@Module({
  providers: [PaymentDocumentsResolver, PaymentDocumentsService]
})
export class PaymentDocumentsModule {}
