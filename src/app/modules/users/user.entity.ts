import { Column, Entity } from 'typeorm';
import { BaseEntity } from '~core/database/base.entity';

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
}
