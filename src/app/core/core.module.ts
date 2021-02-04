import { Module } from '@nestjs/common';
import { AuthorizationModule } from './authorization';
import { ConfigModule } from './config';
import { DatabaseModule } from './database';

@Module({
  imports: [ConfigModule, AuthorizationModule, DatabaseModule],
})
export class CoreModule {}
