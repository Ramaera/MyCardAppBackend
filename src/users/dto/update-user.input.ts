import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateCardUserInput {
  @Field({ nullable: true })
  firstname?: string;
  @Field({ nullable: true })
  lastname?: string;
}
