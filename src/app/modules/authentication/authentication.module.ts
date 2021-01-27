import { Module } from '@nestjs/common';
import { ConfigModule } from '~core/config/config.module';
import { AuthenticationStrategy } from './authentication.strategy';
import { AuthenticationController } from './authentication.controller';
import { UsersModule } from '../users/users.module';
import { AuthenticationService } from './authentication.service';

@Module({
  imports: [ConfigModule, UsersModule],
  providers: [AuthenticationService, AuthenticationStrategy],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
