import { GenerateCardDTO } from './generate-card.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCardInput extends PartialType(GenerateCardDTO) {
  @Field(() => Int)
  id: number;
}
