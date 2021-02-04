import { Repository } from 'typeorm';
import { BaseEntity } from '~core/database/base.entity';

export class BaseRepository<T extends BaseEntity> extends Repository<T> {}
