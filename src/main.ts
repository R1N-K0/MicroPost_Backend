import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3001;
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: "*",
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept'
  })
  await app.listen(port, "0.0.0.0");
}
bootstrap();
