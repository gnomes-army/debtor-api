import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CurrentUser, User } from '~core/authorization';
import { CollectionQueryDto } from '~core/types/api/collection-query.dto';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  async index(@CurrentUser() user: User, @Query() query: CollectionQueryDto) {
    return this.eventsService.index(user.id, query);
  }

  @Post()
  async create(@CurrentUser() user: User, @Body() body: CreateEventDto) {
    return this.eventsService.create(user.id, body);
  }

  @Put(':id')
  async update(@CurrentUser() user: User, @Param('id') id: string, @Body() body: UpdateEventDto) {
    return this.eventsService.update(user.id, id, body);
  }
}
