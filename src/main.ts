import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // (optional) Enable CORS if needed
  await app.listen(8080);
}
bootstrap();
