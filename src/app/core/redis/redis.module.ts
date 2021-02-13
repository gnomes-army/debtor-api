import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisModule as NestjsRedisModule } from 'nestjs-redis';
import { ConfigModule } from '~core/config';
import { EnvironmentVariables } from '~core/types';

@Module({
  imports: [
    NestjsRedisModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        url: configService.get<string>(EnvironmentVariables.REDIS_URL),
      }),
    }),
  ],
})
export class RedisModule {}
