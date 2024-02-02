// import { CreateTransactionInput } from './transaction.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTransactionInput {
  @Field(() => Int)
  id: number;
}
