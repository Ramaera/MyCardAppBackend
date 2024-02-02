import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class LoginInputDTO {
  @Field()
  // @IsEmail()
  email: string;

  @Field()
  // @IsNotEmpty()
  // @MinLength(8)
  password: string;
}
