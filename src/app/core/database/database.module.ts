import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { ConfigModule } from '~core/config';
import { Environment } from '~core/types';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        logging: true,
        synchronize: false,
        entities: [`${__dirname}/../../**/*.entity{.ts,.js}`],
        migrations: [`${__dirname}/../../../db/migrations/*{.ts,.js}`],
        namingStrategy: new SnakeNamingStrategy(),
        ...(configService.get<string>('ENV') === Environment.Local
          ? {}
          : {
              migrationsRun: true,
              ssl: {
                rejectUnauthorized: false,
              },
            }),
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
