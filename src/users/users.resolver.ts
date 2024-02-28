import { PrismaService } from 'nestjs-prisma';
import {
  Resolver,
  Query,
  Parent,
  Mutation,
  Args,
  ResolveField,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UserEntity } from '../common/decorators/user.decorator';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { UsersService } from './users.service';
import { CardUser } from './models/user.model';
import { ChangePasswordInputDTO } from './dto/change-password.input';
import { UpdateCardUserInput } from './dto/update-user.input';
import { CreateUserDto } from './dto/create-user.input';
import { Card } from 'src/card/entities/card.entity';
import { Message } from 'src/transactions/entities/message.entity';

@Resolver(() => CardUser)
// @UseGuards(GqlAuthGuard)
export class UsersResolver {
  constructor(
    private usersService: UsersService,
    private prisma: PrismaService,
  ) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => CardUser)
  async currentUserData(@UserEntity() user: CardUser) {
    return this.usersService.getUser(user.id);
  }

  @Query(() => [CardUser])
  async findCardHoldersInAgency(@Args('agencyCode') agencyCode: string) {
    return this.usersService.cardHolderInAgency(agencyCode);
  }

  @Query(() => [Card])
  async findCardOfaUser(@Args('userId') userId: string) {
    return this.usersService.findCardOfAUser(userId);
  }

  @Mutation(() => CardUser)
  async CreateUser(@Args('data') data: CreateUserDto) {
    return this.usersService.createUser(data);
  }

  @Mutation(() => Message)
  async sendVerificationEmail(@Args('id') id: string) {
    const user = await this.prisma.cardUser.findUnique({
      where: {
        id,
      },
    });

    return this.usersService.sendVerificationEmail(user);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => CardUser)
  async updateCardUser(
    @UserEntity() carduser: CardUser,
    @Args('data') newUserData: UpdateCardUserInput,
  ) {
    return this.usersService.updateUser(carduser.id, newUserData);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => CardUser)
  async changePasswordForUser(
    @UserEntity() carduser: CardUser,
    @Args('data') changePassword: ChangePasswordInputDTO,
  ) {
    return this.usersService.changePassword(
      carduser.id,
      carduser.password,
      changePassword,
    );
  }

  // @ResolveField('posts')
  // posts(@Parent() author: User) {
  //   return this.prisma.user.findUnique({ where: { id: author.id } }).posts();
  // }
}
