import { Expose } from 'class-transformer';

export class AuthenticationResponseDto {
  @Expose() accessToken: string;

  @Expose() refreshToken: string;
}
