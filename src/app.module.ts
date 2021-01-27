import { Module } from '@nestjs/common';
import { AuthenticationModule } from '~modules/authentication/authentication.module';
import { CoreModule } from './app/core/core.module';
import { UsersModule } from './app/modules/users/users.module';
import { HealthCheckController } from './health-check.controller';

@Module({
  imports: [CoreModule, AuthenticationModule, UsersModule],
  controllers: [HealthCheckController],
})
export class AppModule {}
