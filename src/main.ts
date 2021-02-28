import { ClassSerializerInterceptor, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as morgan from 'morgan';
import * as cookieParser from 'cookie-parser';
import { AppModule } from '~app/app.module';

async function bootstrap() {
  const { ENV, PORT = 3000, COOKIES_SECRET } = process.env;
  const logger = new Logger('bootstrap');

  process.env.TZ = 'UTC';

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(morgan('dev'));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), {
      excludeExtraneousValues: true,
      strategy: 'excludeAll',
    }),
  );

  app.enableCors({
    origin: [/https:\/\/debtor-react-frontend.herokuapp.com/, /https?:\/\/localhost(:\d+)?/],
    credentials: true,
  });

  app.use(cookieParser(COOKIES_SECRET));

  await app.listen(PORT, () => {
    logger.log(`Server is listening on port ${PORT} in ${ENV} env`);
  });
}

bootstrap();
