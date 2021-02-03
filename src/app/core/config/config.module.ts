import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { number, object, Schema, string } from 'joi';
import { Environment } from '~core/types';

const isTest = process.env.NODE_ENV === 'test';

const validationSchema = () => {
  const schema: { [key: string]: Schema } = {
    ENV: string()
      .valid(...Object.values(Environment))
      .default(Environment.Local),

    PORT: number(),
  };

  if (!isTest) {
    ['DATABASE_URL', 'JWT_SECRET'].forEach((key) => (schema[key] = string().required()));

    schema.DB_PASSWORD = string().optional();
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
