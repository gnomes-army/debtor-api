import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { number, object, Schema, string } from 'joi';
import { Environment, EnvironmentVariables } from '~core/types';

const isTest = process.env.NODE_ENV === 'test';

const validationSchema = () => {
  const schema: { [key: string]: Schema } = {
    [EnvironmentVariables.ENV]: string()
      .valid(...Object.values(Environment))
      .default(Environment.Local),

    [EnvironmentVariables.CORS_ORIGINS]: string().optional().default(''),

    [EnvironmentVariables.PORT]: number(),
  };

  if (!isTest) {
    [
      EnvironmentVariables.DATABASE_URL,
      EnvironmentVariables.REDIS_URL,
      EnvironmentVariables.JWT_SECRET,
      EnvironmentVariables.JWT_ACCESS_TTL,
      EnvironmentVariables.JWT_REFRESH_TTL,
      EnvironmentVariables.COOKIES_SECRET,
      EnvironmentVariables.GOOGLE_OAUTH2_CLIENT_ID,
      EnvironmentVariables.GOOGLE_OAUTH2_CLIENT_SECRET,
    ].forEach((key) => (schema[key] = string().required()));
  }

  return object(schema);
};

const envFilePath = () => {
  const envFiles = ['.env'];

  if (isTest) {
    envFiles.unshift('.env.test');
  }

  return envFiles;
};

@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: envFilePath(),
      validationSchema: validationSchema(),
    }),
  ],
  exports: [NestConfigModule],
})
export class ConfigModule {}
