import { EntityRepository } from 'typeorm';
import { BaseRepository } from '~core/database';
import { UserEntity } from './user.entity';

@EntityRepository(UserEntity)
export class UserRepository extends BaseRepository<UserEntity> {}
