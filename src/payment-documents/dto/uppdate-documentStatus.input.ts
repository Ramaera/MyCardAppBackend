import { STATUS } from '@prisma/client';
import { CreatePaymentDocumentInput } from './create-payment-document.input';
import {
  InputType,
  Field,
  Int,
  PartialType,
  registerEnumType,
} from '@nestjs/graphql';

@InputType()
export class UpdateDocumentStatusByAdmin {
  @Field(() => String)
  id: string;

  @Field(() => STATUS)
  status: STATUS;
}

registerEnumType(STATUS, {
  name: 'STATUS',
});
