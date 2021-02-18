import { Expose } from 'class-transformer';

export class AuthenticationResponseDto {
  @Expose() expiresAt: number;
}
