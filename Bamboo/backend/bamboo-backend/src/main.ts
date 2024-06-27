/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Strips properties that do not have decorators
    forbidNonWhitelisted: true, // Throws an error if non-whitelisted properties are present
    transform: true, // Transforms payloads to be objects typed according to their DTO classes
  }))
  app.enableCors({
    origin: [
      'http://localhost:5173'
    ],
    allowedHeaders: ['Authorization', 'Content-Type', 'Access-Control-Allow-Headers'],
    exposedHeaders: ['Authorization'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  })
  app.use(cookieParser())
  await app.listen(3000);
}
bootstrap().catch(console.error)
