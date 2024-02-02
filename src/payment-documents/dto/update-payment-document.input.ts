import { CreatePaymentDocumentInput } from './create-payment-document.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePaymentDocumentInput extends PartialType(
  CreatePaymentDocumentInput,
) {
  @Field(() => String)
  id: string;

  @Field(() => Int)
  amount: number;

  @Field(() => String)
  url: string;

  @Field(() => String)
  utrNo: string;
}
