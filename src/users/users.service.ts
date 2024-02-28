import { PrismaService } from 'nestjs-prisma';
import {
  Injectable,
  BadRequestException,
  ConflictException,
  NotFoundException,
  NotAcceptableException,
} from '@nestjs/common';
import { PasswordService } from '../auth/password.service';
import { ChangePasswordInputDTO } from './dto/change-password.input';
import { UpdateCardUserInput } from './dto/update-user.input';
import { CreateUserDto } from './dto/create-user.input';
import { Prisma, CardUser } from '@prisma/client';
import * as crypto from 'crypto';
import { MailerService } from 'src/mailer/mailer.service';
@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private passwordService: PasswordService,
    private mailService: MailerService,
  ) {}

  async createUser(data: CreateUserDto) {
    try {
      const user = await this.prisma.cardUser.create({
        data: {
          name: data.name,
          email: data.email,
          mobileNumber: data.mobileNumber,
          address: data.address,
          referralAgencyCode: data.referralAgencyCode,
        },
      });

      this.sendVerificationEmail(user);

      console.log('send');
      //  Send My Card Details To my Mail Id
      return user;
    } catch (error) {
      console.log('errror', error.message);
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        const errorValue = error.meta.target[0];

        throw new ConflictException(`${errorValue}   already used.`);
      }
      throw new Error(error);
    }
  }

  async findCardOfAUser(userId: string) {
    return this.prisma.myCard.findMany({
      where: {
        cardHolderUserId: userId,
      },
      include: {
        Documents: true,
      },
    });
  }

  async cardHolderInAgency(agencyCode: string) {
    return this.prisma.cardUser.findMany({
      where: {
        referralAgencyCode: agencyCode,
      },
      include: {
        myCard: true,
      },
    });
  }

  //
  // ***************************** Get User Details By Id    ************************
  async getUser(userId: string) {
    const user = await this.prisma.cardUser.findFirst({
      where: { id: userId },
      include: {
        myCard: true,
      },
    });
    return user;
  }

  //**************************Generate Verification Token********************/
  async generateVerificationToken() {
    return crypto.randomBytes(30).toString('hex');
  }

  // *********** Send Verification Email ************************************
  async sendVerificationEmail(user: CardUser) {
    const token = await this.generateVerificationToken();
    const expiry = new Date(Date.now() + 24 * 60 * 60 * 1000);
    await this.updateVerificationToken(user, token, expiry);
    await this.mailService.sendEmailConfirmation(user, token);
    return { message: 'Success' };
  }

  async updateVerificationToken(user: CardUser, token: string, expiry: Date) {
    return this.prisma.cardUser.update({
      where: {
        id: user.id,
      },
      data: {
        verificationToken: token,
        verificationTokenExpiry: expiry,
      },
    });
  }

  // **************** UpdateEmailVerification Status *******************************

  updateUser(userId: string, newUserData: UpdateCardUserInput) {
    return this.prisma.cardUser.update({
      data: newUserData,
      where: {
        id: userId,
      },
    });
  }

  // ********** Receive Coupun Code & Make The Transaction ************************
  // async transaction(couponCodeData: CouponCodeDto) {
  //   try {
  //     const coupoun = await this.validateCoupon(couponCodeData.couponCode);

  //     if (coupoun.card.cardNumber != couponCodeData.cardNumber) {
  //       throw new Error('Wrong Coupoun Code');
  //     }

  //     const transact = await this.prisma.transaction.create({
  //       data: {
  //         amount: coupoun.discount,
  //         cardId: coupoun.myCardId,
  //         metaData: couponCodeData.metaData,
  //       },
  //     });
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // }

  // ****************** Generate & Send Coupoun Code *******************************
  // async SendCouponCode(transacation: TransactionDto) {
  //   const checkCard = await this.prisma.myCard.findUnique({
  //     where: {
  //       cardNumber: transacation.cardNumber,
  //     },
  //     include: {
  //       cardHolderUser: true,
  //     },
  //   });
  //   const checkTransactOfCurrentMonth = await this.prisma.transaction.findMany({
  //     where: {
  //       cardId: checkCard.id,
  //       createdAt: {
  //         gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  //         lte: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
  //       },
  //     },
  //   });

  //   if (!checkCard) {
  //     throw new NotFoundException('Card Number is Not Valid');
  //   }
  //   const totalAmount = checkTransactOfCurrentMonth.reduce(
  //     (sum, item) => sum + item.amount,
  //     0,
  //   );

  //   if (totalAmount + transacation.discountAmount > checkCard.maxDiscount) {
  //     throw new NotAcceptableException(
  //       'Entered Amount is Greater Than Max Redeem Value of this Month',
  //     );
  //   }

  //   const couponCode = this.generateRandomCouponCode();

  //   const coupon = await this.prisma.couponCode.create({
  //     data: {
  //       couponCode,
  //       myCardId: checkCard.id,
  //       discount: transacation.discountAmount,
  //     },
  //   });

  //   this.sendCode(checkCard.cardHolderUser, coupon.couponCode);

  //   return coupon.couponCode;
  // }

  async changePassword(
    userId: string,
    userPassword: string,
    changePassword: ChangePasswordInputDTO,
  ) {
    const passwordValid = await this.passwordService.validatePassword(
      changePassword.oldPassword,
      userPassword,
    );

    if (!passwordValid) {
      throw new BadRequestException('Invalid password');
    }

    const hashedPassword = await this.passwordService.hashPassword(
      changePassword.newPassword,
    );

    return this.prisma.cardUser.update({
      data: {
        password: hashedPassword,
      },
      where: { id: userId },
    });
  }
}
