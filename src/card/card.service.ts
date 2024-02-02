import { Injectable } from '@nestjs/common';
// import { CreateCardInput } from './dto/create-card.input';
import { UpdateCardInput } from './dto/update-card.input';
import { PrismaService } from 'nestjs-prisma';
import CardWithValue from './cardType';
import { CARD_TYPE } from '@prisma/client';
import { GenerateCardDTO } from './dto/generate-card.input';

@Injectable()
export class CardService {
  constructor(private readonly prisma: PrismaService) {}

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

  update(id: number, updateCardInput: UpdateCardInput) {
    return `This action updates a #${id} card`;
  }

  remove(id: number) {
    return `This action removes a #${id} card`;
  }
}
