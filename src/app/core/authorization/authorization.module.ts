import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '~core/config';
import { JwtGuard } from './jwt.guard';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [ConfigModule],
  providers: [
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
})
export class AuthorizationModule {}
