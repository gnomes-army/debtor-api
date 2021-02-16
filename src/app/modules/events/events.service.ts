import { Injectable, NotFoundException } from '@nestjs/common';
import { CollectionResponseDto, ResponseDto } from '~core/types';
import { CollectionQueryDto } from '~core/types/api/collection-query.dto';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventEntity } from './event.entity';
import { EventRepository } from './event.repository';

@Injectable()
export class EventsService {
  constructor(private readonly eventRepository: EventRepository) {}

  async index(
    userId: string,
    query: CollectionQueryDto,
  ): Promise<CollectionResponseDto<EventEntity>> {
    return new CollectionResponseDto<EventEntity>(
      await this.eventRepository.findWithPagination(
        {
          where: { userId },
          order: { createdAt: 'DESC' },
        },
        query.page,
        query.limit,
      ),
    );
  }

  async create(userId: string, body: CreateEventDto): Promise<ResponseDto<EventEntity>> {
    return new ResponseDto<EventEntity>(
      await this.eventRepository.save(this.eventRepository.create({ ...body, userId })),
    );
  }

  async update(
    userId: string,
    id: string,
    body: UpdateEventDto,
  ): Promise<ResponseDto<EventEntity>> {
    const event = await this.eventRepository.findOne({ where: { id, userId } });

    if (!event) {
      throw new NotFoundException(`Event ${id} not found`);
    }

    return new ResponseDto<EventEntity>(
      await this.eventRepository.save(
        this.eventRepository.merge(event, this.eventRepository.create(body)),
      ),
    );
  }
}
