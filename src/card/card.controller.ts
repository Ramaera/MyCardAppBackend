import { Controller, Get, Param } from '@nestjs/common';
import { CardService } from './card.service';

@Controller('my-card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Get('verifyEmail/:token')
  async getHelloName(@Param('token') token: string) {
    const message = await this.cardService.verifyEmailWithToken(token);
    return message.message;
  }
}
