import { InputType, Int, Field, registerEnumType } from '@nestjs/graphql';
import { CARD_TYPE } from '@prisma/client';

@InputType()
export class GenerateCardDTO {
  @Field(() => String, { description: 'Example field (placeholder)' })
  cardHolderId: string;

  @Field(() => CARD_TYPE, { description: 'Example field (placeholder)' })
  cardType: CARD_TYPE;
}

registerEnumType(CARD_TYPE, {
  name: 'CARD_TYPE',
});
