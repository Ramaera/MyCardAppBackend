import { ObjectType, Field, Int } from '@nestjs/graphql';
import { STATUS } from '@prisma/client';
import { Card } from 'src/card/entities/card.entity';
import { CardUser } from 'src/users/models/user.model';

@ObjectType()
export class PaymentDocument {
  @Field(() => String, { description: 'Title of Image' })
  title: string;

  @Field(() => String, { description: 'Url Of Image' })
  url: string;

  @Field(() => Int, { description: 'Payment Proof AMount' })
  amount: number;

  @Field(() => String, { description: 'Utr Number' })
  utrNo: string;

  @Field(() => STATUS, { description: 'Document Status' })
  status: STATUS;

  @Field(() => String, { description: 'Document Id' })
  id: string;
}
