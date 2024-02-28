import {
  Resolver,
  Mutation,
  Args,
  Query,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Authe } from './models/auth.model';
import { Token } from './models/token.model';
import { LoginInputDTO } from './dto/login.input';
import { SignupInput } from './dto/signup.input';
import { RefreshTokenInput } from './dto/refresh-token.input';
import { CardUser } from '../users/models/user.model';

@Resolver(() => Authe)
export class AuthResolver {
  constructor(private readonly auth: AuthService) {}

  @Mutation(() => Authe)
  async loginForUser(@Args('data') { email, password }: LoginInputDTO) {
    console.log('123456');
    const { accessToken, refreshToken } = await this.auth.login(
      email.toLowerCase(),
      password,
    );

    return { accessToken, refreshToken };
  }

  @Mutation(() => Token)
  async refreshToken(@Args() { token }: RefreshTokenInput) {
    return this.auth.refreshToken(token);
  }

  @ResolveField('user', () => CardUser)
  async user(@Parent() auth: Authe) {
    return await this.auth.getUserFromToken(auth.accessToken);
  }
}
