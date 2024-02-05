import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
// import { CreateTransactionInput } from './dto/transaction.input';
// import { UpdateTransactionInput } from './dto/update-transaction.input';
import { PrismaService } from 'nestjs-prisma';
import { CoupounCodeDto } from './dto/coupoun-code.input';
import { MailerService } from 'src/mailer/mailer.service';
import { TransactionDto } from './dto/transaction.input';
import { sendCodeDTO } from './dto/send-transaction.input';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailService: MailerService,
  ) {}
  // ********** Receive Coupun Code & Make The Transaction ************************
  async transaction(couponCodeData: CoupounCodeDto) {
    try {
      const coupoun = await this.validateCoupon(couponCodeData.coupounCode);

      if (coupoun.card.cardNumber.toString() != couponCodeData.cardNumber) {
        throw new Error('Wrong Coupoun Code');
      }

      const transact = await this.prisma.transaction.create({
        data: {
          amount: coupoun.discount,
          cardId: coupoun.myCardId,
        },
      });
      return { message: 'Payment SuccesssFull' };
    } catch (error) {
      throw new Error(error);
    }
  }

  // ****************** Generate & Send Coupoun Code *******************************
  async SendCouponCode(sendCode: sendCodeDTO) {
    const checkCard = await this.prisma.myCard.findUnique({
      where: {
        cardNumber: sendCode.cardNumber,
      },
      include: {
        cardHolderUser: true,
      },
    });
    const checkTransactOfCurrentMonth = await this.prisma.transaction.findMany({
      where: {
        cardId: checkCard.id,
        createdAt: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          lte: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
        },
      },
    });

    if (!checkCard) {
      throw new NotFoundException('Card Number is Not Valid');
    }
    const totalAmount = checkTransactOfCurrentMonth.reduce(
      (sum, item) => sum + item.amount,
      0,
    );

    if (totalAmount + sendCode.discountAmount > checkCard.maxDiscount) {
      throw new NotAcceptableException(
        'Entered Amount is Greater Than Max Redeem Value of this Month',
      );
    }

    const couponCode = this.generateRandomCouponCode();

    const coupon = await this.prisma.couponCode.create({
      data: {
        couponCode,
        myCardId: checkCard.id,
        discount: sendCode.discountAmount,
      },
    });

    console.log('here');

    // this.sendCode(checkCard.cardHolderUser, coupon.couponCode);
    console.log(coupon);
    return coupon;
  }

  //*********************** */ MAIL SERVICE:: Send Coupoun Code *******************
  async sendCode(user, CoupounCode) {
    await this.mailService.sendCoupounCode(user, CoupounCode);
  }

  //*********************** */  VALIDATION OF COUPOUN CODE **********************
  async validateCoupon(couponCode: string) {
    const coupon = await this.prisma.couponCode.findUnique({
      where: {
        couponCode,
      },
      include: {
        card: true,
      },
    });

    if (!coupon || this.isCouponExpired(coupon.createdAt)) {
      throw new NotFoundException('Invalid or Expired Coupon Code');
    }
    return coupon;
  }

  //*************************** */  GENERATE COUPOUN CODE ********************
  private generateRandomCouponCode(): string {
    const randomString = Math.random().toString(36).substring(7);
    return randomString.toUpperCase().substr(0, 8); // Adjust the length as needed
  }

  //************************************ */ VALIDATION OF COUPOUN EXPIRED OR NOT ****************

  private isCouponExpired(createdAt: Date): boolean {
    const expirationTime = 5 * 60 * 1000; // 5 minutes in milliseconds
    const currentTime = new Date().getTime();
    const couponTime = createdAt.getTime();
    return currentTime - couponTime > expirationTime;
  }

  findAll() {
    return `This action returns all transactions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
