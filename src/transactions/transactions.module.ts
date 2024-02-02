import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsResolver } from './transactions.resolver';
import { MailerModule } from 'src/mailer/mailer.module';

@Module({
  imports: [MailerModule],
  providers: [TransactionsResolver, TransactionsService],
})
export class TransactionsModule {}
