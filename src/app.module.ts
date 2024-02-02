import { GraphQLModule } from '@nestjs/graphql';
import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule, loggingMiddleware } from 'nestjs-prisma';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppResolver } from './app.resolver';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import config from './common/configs/config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GqlConfigService } from './gql-config.service';
import { CardModule } from './card/card.module';
import { MailerService } from './mailer/mailer.service';
import { MailerModule } from './mailer/mailer.module';
import { TransactionsModule } from './transactions/transactions.module';
import { MediaUploadModule } from './media-upload/media-upload.module';
import { PaymentDocumentsModule } from './payment-documents/payment-documents.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        middlewares: [
          // configure your prisma middleware
          loggingMiddleware({
            logger: new Logger('PrismaMiddleware'),
            logLevel: 'log',
          }),
        ],
      },
    }),

    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GqlConfigService,
    }),

    AuthModule,
    UsersModule,
    CardModule,
    MailerModule,
    TransactionsModule,
    MediaUploadModule,
    PaymentDocumentsModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver, MailerService],
})
export class AppModule {}
