import { Module } from '@nestjs/common';
import { CoreModule } from '~core/core.module';
import { AuthenticationModule } from '~modules/authentication/authentication.module';
import { UsersModule } from '~modules/users/users.module';
import { HealthCheckController } from './health-check.controller';

@Module({
  imports: [CoreModule, AuthenticationModule, UsersModule],
  controllers: [HealthCheckController],
})
export class AppModule {}
