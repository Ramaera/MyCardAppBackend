import { Injectable } from '@nestjs/common';
import { CreatePaymentDocumentInput } from './dto/create-payment-document.input';
import { UpdatePaymentDocumentInput } from './dto/update-payment-document.input';
import { PrismaService } from 'nestjs-prisma';
import { UpdateDocumentStatusByAdmin } from './dto/uppdate-documentStatus.input';
import CardWithValue from 'src/card/cardType';

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
export class PaymentDocumentsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createPaymentDocumentInput: CreatePaymentDocumentInput) {
    return this.prisma.documents.create({
      data: {
        title: createPaymentDocumentInput.title,
        url: createPaymentDocumentInput.url,
        amount: createPaymentDocumentInput.amount,
        utrNo: createPaymentDocumentInput.utrNo,
        myCardId: createPaymentDocumentInput.myCardId,
        cardUserId: createPaymentDocumentInput.cardUserId,
      },
    });
  }

  updateDocuments(data: UpdatePaymentDocumentInput) {
    return this.prisma.documents.update({
      where: {
        id: data.id,
      },
      data: {
        url: data.url,
        amount: data.amount,
        utrNo: data.utrNo,
      },
    });
  }

  findAllPaymentOfaCard(myCardId: number) {
    return this.prisma.documents.findMany({
      where: {
        myCardId,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.documents.findUnique({
      where: {
        id,
      },
    });
  }

  findAll() {
    return this.prisma.myCard.findMany({
      include: { Documents: true, cardHolderUser: true },
    });
  }
  async updateDocumentStatusByAdmin(data) {
    var approvalDocumentDate;
    if (data.status === 'APPROVED') {
      approvalDocumentDate = DateInGmt530();
    }
    return this.prisma.documents.update({
      data: {
        documentApprovalDate: approvalDocumentDate,
        status: data.status,
      },
      where: {
        id: data.id,
      },
    });
  }

  async activateCard(data) {
    const paymentDocuments = await this.prisma.documents.findMany({
      where: {
        myCardId: data.id,
        status: 'APPROVED',
      },
    });

    const cardValue = await this.prisma.myCard.findUnique({
      where: {
        id: data.id,
      },
    });

    const cardData = CardWithValue.find(
      (card) => card.type === cardValue.cardType,
    );

    var cardPaymentAmount = 0;
    paymentDocuments.map((data) => (cardPaymentAmount += data.amount));

    // if (cardData.rechargeAmount>=)

    this.prisma.myCard.update({
      where: {
        id: data.id,
      },
      data: {
        isActive: true,
      },
    });
  }

  update(id: number, updatePaymentDocumentInput: UpdatePaymentDocumentInput) {
    return `This action updates a #${id} paymentDocument`;
  }

  remove(id: number) {
    return `This action removes a #${id} paymentDocument`;
  }
}
