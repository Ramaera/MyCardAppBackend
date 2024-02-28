import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CardService } from './card.service';
import { Card } from './entities/card.entity';
import { GenerateCardDTO } from './dto/generate-card.input';
import { UpdateCardInput } from './dto/update-card.input';
import { ActivateCardDto } from './dto/activate-card.input';
import { Message } from 'src/transactions/entities/message.entity';

@Resolver(() => Card)
export class CardResolver {
  constructor(private readonly cardService: CardService) {}

  @Mutation(() => Card)
  createCard(@Args('data') data: GenerateCardDTO) {
    return this.cardService.generateCard(data);
  }

  // @Query(() => [Card], { name: 'card' })
  // findAll() {
  //   return this.cardService.findAll();
  // }

  @Mutation(() => Message)
  activateTheCard(@Args('data') data: ActivateCardDto) {
    return this.cardService.activateCard(data);
  }

  @Query(() => Card, { name: 'card' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.cardService.findOne(id);
  }

  @Query(() => Card, { name: 'CardDetails' })
  async findCardDetails(@Args('cardNumber') cardNumber: string) {
    return this.cardService.findCard(cardNumber);
  }

  @Mutation(() => Card)
  updateCard(@Args('updateCardInput') updateCardInput: UpdateCardInput) {
    return this.cardService.update(updateCardInput.id, updateCardInput);
  }

  @Mutation(() => Card)
  removeCard(@Args('id', { type: () => Int }) id: number) {
    return this.cardService.remove(id);
  }
}
