import { Expose } from 'class-transformer';

export class CurrentUserDto {
  @Expose() id: string;

  @Expose() email: string;

  @Expose() avatar: string;
}
