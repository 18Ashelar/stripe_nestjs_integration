import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
    app.use(
    '/payments/webhook',
    bodyParser.raw({ type: 'application/json' }), // Capture raw body for JSON type requests
  );
    app.use(json());
  app.use(urlencoded({ extended: true }));
  await app.listen(3000);
}
bootstrap();
