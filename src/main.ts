import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as morgan from 'morgan';
import { AppModule } from '~app/app.module';

async function bootstrap() {
  const { ENV, PORT = 3000 } = process.env;
  const logger = new Logger('bootstrap');

  process.env.TZ = 'UTC';

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(morgan('dev'));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  await app.listen(PORT, () => {
    logger.log(`Server is listening on port ${PORT} in ${ENV} env`);
  });
}

bootstrap();
