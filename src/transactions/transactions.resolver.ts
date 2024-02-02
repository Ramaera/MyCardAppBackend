import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TransactionsService } from './transactions.service';
import { CoupounCode, Transaction } from './entities/transaction.entity';
import { UpdateTransactionInput } from './dto/update-transaction.input';
import { sendCodeDTO } from './dto/send-transaction.input';
import { CoupounCodeDto } from './dto/coupoun-code.input';
import { Message } from './entities/message.entity';
// import { CreateTransactionInput } from './dto/transaction.input';
// import { UpdateTransactionInput } from './dto/update-transaction.input';

@Resolver(() => Transaction)
export class TransactionsResolver {
  constructor(private readonly transactionsService: TransactionsService) {}

  // @Mutation(() => Transaction)
  // createTransaction(
  //   @Args('createTransactionInput')
  //   createTransactionInput: CreateTransactionInput,
  // ) {
  //   return this.transactionsService.create(createTransactionInput);
  // }

  @Query(() => [Transaction], { name: 'transactions' })
  findAll() {
    return this.transactionsService.findAll();
  }

  @Query(() => Transaction, { name: 'transaction' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.transactionsService.findOne(id);
  }

  @Mutation(() => Transaction)
  updateTransaction(
    @Args('updateTransactionInput')
    updateTransactionInput: UpdateTransactionInput,
  ) {
    return this.transactionsService.update(updateTransactionInput.id);
  }

  @Mutation(() => CoupounCode)
  sendCoupounCode(
    @Args('data')
    sendCode: sendCodeDTO,
  ) {
    return this.transactionsService.SendCouponCode(sendCode);
  }

  @Mutation(() => Message)
  submitCoupounCode(
    @Args('data')
    couponCodeData: CoupounCodeDto,
  ) {
    return this.transactionsService.transaction(couponCodeData);
  }

  @Mutation(() => Transaction)
  removeTransaction(@Args('id', { type: () => Int }) id: number) {
    return this.transactionsService.remove(id);
  }
}
