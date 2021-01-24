import { Module } from '@nestjs/common';
import { CoreModule } from './app/core/core.module';
import { HealthCheckController } from './health-check.controller';

@Module({
  imports: [CoreModule],
  controllers: [HealthCheckController],
})
export class AppModule {}
