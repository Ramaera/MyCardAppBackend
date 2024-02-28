import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardResolver } from './card.resolver';
import { CardController } from './card.controller';
import { PasswordService } from 'src/auth/password.service';
import { MailerModule } from 'src/mailer/mailer.module';

@Module({
  providers: [CardResolver, CardService, PasswordService],
  controllers: [CardController],
  imports: [MailerModule],
})
export class CardModule {}
