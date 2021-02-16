import { EntityRepository } from 'typeorm';
import { BaseRepository } from '~core/database';
import { EventEntity } from './event.entity';

@EntityRepository(EventEntity)
export class EventRepository extends BaseRepository<EventEntity> {}
