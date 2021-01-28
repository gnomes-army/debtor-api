import { Module } from '@nestjs/common';
import { AuthModule } from '~modules/auth/auth.module';
import { CoreModule } from './app/core/core.module';
import { UsersModule } from './app/modules/users/users.module';
import { HealthCheckController } from './health-check.controller';

@Module({
  imports: [CoreModule, AuthModule, UsersModule],
  controllers: [HealthCheckController],
})
export class AppModule {}
