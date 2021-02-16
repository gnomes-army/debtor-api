import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '~core/database';
import { EventEntity } from '~modules/events/event.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column()
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  avatar: string;

  @OneToMany(() => EventEntity, (event) => event.user)
  events: EventEntity[];
}
