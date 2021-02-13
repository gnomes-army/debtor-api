import { Module } from '@nestjs/common';
import { AuthorizationModule } from './authorization';
import { ConfigModule } from './config';
import { DatabaseModule } from './database';
import { RedisModule } from './redis';

@Module({
  imports: [ConfigModule, AuthorizationModule, DatabaseModule, RedisModule],
  exports: [ConfigModule],
})
export class CoreModule {}
