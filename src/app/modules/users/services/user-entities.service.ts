import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseEntitiesService } from '~core/services/base-entities.service';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserEntitiesService extends BaseEntitiesService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    repository: Repository<UserEntity>,
  ) {
    super(repository);
  }
}
