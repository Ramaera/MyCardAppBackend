import { Injectable } from '@nestjs/common';
// import { CreateCardInput } from './dto/create-card.input';
import { UpdateCardInput } from './dto/update-card.input';
import { PrismaService } from 'nestjs-prisma';
import CardWithValue from './cardType';
import { CARD_TYPE, CardUser } from '@prisma/client';
import { GenerateCardDTO } from './dto/generate-card.input';
import { ActivateCardDto } from './dto/activate-card.input';
import { PasswordService } from 'src/auth/password.service';
import { MailerService } from 'src/mailer/mailer.service';

const DateInGmt530 = () => {
  // Create a new Date object for the current date and time
  const currentDate = new Date();

  // Get the current time in milliseconds since January 1, 1970
  const currentTimeInMilliseconds = currentDate.getTime();

  // Calculate the offset in milliseconds for GMT+5:30 (5 hours and 30 minutes)
  const offsetInMilliseconds = 5.5 * 60 * 60 * 1000;

  // Apply the offset to the current time
  const newDateWithOffset = new Date(
    currentTimeInMilliseconds + offsetInMilliseconds,
  );

  return newDateWithOffset;
};

@Injectable()
export class CardService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly passwordService: PasswordService,
    private readonly mailService: MailerService,
  ) {}

  // *************** Generate Card ***********************************************

  async generateCard(data: GenerateCardDTO) {
    // Generate Card Number
    const createCardNumber = () => {
      return Math.floor(Math.random() * 1000000000000000).toString();
    };

    // Check card Data From its type
    const cardData = CardWithValue.find((card) => card.type === data.cardType);

    //  feeding the card Data into Dataabase
    const generateCard = await this.prisma.myCard.create({
      data: {
        cardNumber: createCardNumber(),
        cardValue: cardData.value,
        cardType: data.cardType,
        maxDiscount: cardData.maxDiscount,
        cardValidity: cardData.validity,
        cardHolderUserId: data.cardHolderId,
      },
    });

    return generateCard;
  }

  findAll() {
    return `This action returns all card`;
  }

  findCard(cardNumber: string) {
    return this.prisma.myCard.findUnique({
      where: {
        cardNumber: cardNumber,
      },
      include: {
        cardHolderUser: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.myCard.findFirst({
      where: {
        id,
      },
    });
  }
  async activateCard(data: ActivateCardDto) {
    const getCardData = await this.prisma.myCard.findUnique({
      where: {
        cardNumber: data.cardNumber,
      },
    });

    const activationDate = DateInGmt530();

    const expiryDate = activationDate;
    expiryDate.setMonth(expiryDate.getMonth() + getCardData.cardValidity);
    const activateCard = await this.prisma.myCard.update({
      where: {
        cardNumber: data.cardNumber,
      },
      data: {
        isActive: true,
        activationDate: DateInGmt530(),
        expiryDate: expiryDate,
      },
    });

    return { message: 'Card Activated SuccessFully' };
  }

  async createPassword(userId: string) {
    const generateRandomString = (length) => {
      var chars =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var randomString = '';
      for (var i = 0; i < length; i++) {
        var randomNumber = Math.floor(Math.random() * chars.length);
        randomString += chars.charAt(randomNumber);
      }
      return randomString;
    };

    // Converting it into Hash
    const password = generateRandomString(8);
    const hashedPassword = await this.passwordService.hashPassword(password);

    const newData = await this.prisma.cardUser.update({
      where: {
        id: userId,
      },
      data: {
        password: hashedPassword,
      },
    });

    await this.mailService.sendPassword(newData, password);
  }

  // verifyEmailWithToken
  async verifyEmailWithToken(token) {
    const userWithToken = await this.prisma.cardUser.findUnique({
      where: {
        verificationToken: token,
      },
    });
    if (userWithToken) {
      const tokenInvalid = await this.isVerificationTokenExpired(userWithToken);
      if (!tokenInvalid) {
        this.updateVerificationStatus(userWithToken.id);
        this.createPassword(userWithToken.id);
        return { message: 'Email Verified SuccessFully' };
      }
      return { message: 'Activation Link Expired' };
    }

    return { message: 'Email Already Verified  or Invalid Activation Link ' };
  }

  //************ Expiry of Verification Token ***********************/
  async isVerificationTokenExpired(user: CardUser): Promise<boolean> {
    return user.verificationTokenExpiry <= new Date();
  }

  //  ************ Update Verification Status ***************

  async updateVerificationStatus(id: string) {
    const user = await this.prisma.cardUser.update({
      where: {
        id,
      },
      data: {
        emailVerified: true,
        verificationToken: null,
        verificationTokenExpiry: null,
      },
    });
    return user;
  }

  update(id: number, updateCardInput: UpdateCardInput) {
    return `This action updates a #${id} card`;
  }

  remove(id: number) {
    return `This action removes a #${id} card`;
  }
}
