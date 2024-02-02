import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PaymentDocumentsService } from './payment-documents.service';
import { PaymentDocument } from './entities/payment-document.entity';
import { CreatePaymentDocumentInput } from './dto/create-payment-document.input';
import { UpdatePaymentDocumentInput } from './dto/update-payment-document.input';
import { UpdateDocumentStatusByAdmin } from './dto/uppdate-documentStatus.input';
import { Card } from 'src/card/entities/card.entity';

@Resolver(() => PaymentDocument)
export class PaymentDocumentsResolver {
  constructor(
    private readonly paymentDocumentsService: PaymentDocumentsService,
  ) {}

  @Mutation(() => PaymentDocument)
  createPaymentDocument(
    @Args('createPaymentDocumentInput')
    createPaymentDocumentInput: CreatePaymentDocumentInput,
  ) {
    return this.paymentDocumentsService.create(createPaymentDocumentInput);
  }

  @Query(() => [Card], { name: 'AllpaymentDocuments' })
  async findAll() {
    console.log(await this.paymentDocumentsService.findAll());
    return this.paymentDocumentsService.findAll();
  }

  @Query(() => PaymentDocument, { name: 'paymentDocument' })
  findOne(@Args('id', { type: () => Int }) id: string) {
    return this.paymentDocumentsService.findOne(id);
  }

  @Query(() => [PaymentDocument], { name: 'PaymentDocumetForCard' })
  findCardPayment(@Args('cardId', { type: () => Int }) cardId: number) {
    return this.paymentDocumentsService.findAllPaymentOfaCard(cardId);
  }

  @Mutation(() => PaymentDocument)
  updatePaymentDocument(
    @Args('updatePaymentDocumentInput')
    updatePaymentDocumentInput: UpdatePaymentDocumentInput,
  ) {
    return this.paymentDocumentsService.updateDocuments(
      updatePaymentDocumentInput,
    );
  }

  @Mutation(() => PaymentDocument)
  updatePaymentDocumentStatusByAdmin(
    @Args('data')
    data: UpdateDocumentStatusByAdmin,
  ) {
    return this.paymentDocumentsService.updateDocumentStatusByAdmin(data);
  }

  @Mutation(() => PaymentDocument)
  removePaymentDocument(@Args('id', { type: () => Int }) id: number) {
    return this.paymentDocumentsService.remove(id);
  }
}
