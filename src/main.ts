import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { configs } from './configs';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix('/v1');

  app.enableCors({
    credentials: true,
    origin: function (origin, callback) {
      callback(null, true);
    },
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      skipMissingProperties: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.use(cookieParser());

  const port = configs.SERVER_PORT || 3000;

  await app.listen(port, async () => {
    console.log(
      `The server is running on ${port} port: http://localhost:${port} `,
    );
  });
}
bootstrap();
