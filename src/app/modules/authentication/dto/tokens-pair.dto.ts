import { Expose } from 'class-transformer';

export class TokensPairDto {
  @Expose() accessToken: string;

  @Expose() refreshToken: string;
}
