import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Pasang security headers HTTP menggunakan helmet
  app.use(helmet());

  // Aktifkan CORS agar frontend bisa fetch data beserta header Authorization
  app.enableCors();

  // Aktifkan validasi DTO secara global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(3001);
  console.log('Backend AIRA berjalan di: http://localhost:3001');
}
void bootstrap();
