import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as morgan from 'morgan';
import { AppModule } from './app.module';

async function bootstrap() {
  const { ENV, PORT = 3000 } = process.env;
  const logger = new Logger('bootstrap');

  process.env.TZ = 'UTC';

  const app = await NestFactory.create(AppModule);

  /**
   * Requests logger
   */

  app.use(morgan('dev'));

  await app.listen(PORT, () => {
    logger.log(`Server is listening on port ${PORT} in ${ENV} env`);
  });
}
bootstrap();
