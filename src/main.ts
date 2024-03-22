import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as passport from 'passport';

const whitelist = ['http://localhost:5173', 'https://fikra.vercel.app'];

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');
  app.use(
    session({
      name: 'fikra',
      secret: 'my-secret',
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: 60000 },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.enableCors({
    origin: whitelist,
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}

bootstrap();
