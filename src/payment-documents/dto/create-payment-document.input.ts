import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePaymentDocumentInput {
  @Field(() => String, { description: 'Title of Image' })
  title: string;

  @Field(() => String, { description: 'Url Of Image' })
  url: string;

  @Field(() => Int, { description: 'Payment Proof AMount' })
  amount: number;

  @Field(() => String, { description: 'Utr Number' })
  utrNo: string;

  @Field(() => Int, {
    description: 'Id Of Card FOr which Payment has been made',
  })
  myCardId: number;

  @Field(() => String, { description: 'Id Of card User' })
  cardUserId: string;
}
