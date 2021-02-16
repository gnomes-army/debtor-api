import { SerializeOptions } from '@nestjs/common';
import { Expose } from 'class-transformer';
import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '~core/database';
import { UserEntity } from '~modules/users/user.entity';

@Entity('events')
export class EventEntity extends BaseEntity {
  @Expose()
  object = 'event';

  @Column()
  @Expose()
  name: string;

  @Column('date')
  @Expose()
  startDate: Date;

  @Column('date')
  @Expose()
  endDate: Date;

  @Column('uuid')
  userId: string;

  @ManyToOne(() => UserEntity)
  user: UserEntity;
}
