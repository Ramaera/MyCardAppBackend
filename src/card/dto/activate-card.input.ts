import { InputType, Int, Field, registerEnumType } from '@nestjs/graphql';
import { CARD_TYPE } from '@prisma/client';

@InputType()
export class ActivateCardDto {
  @Field(() => String, { description: 'Card Number' })
  cardNumber: string;
}
