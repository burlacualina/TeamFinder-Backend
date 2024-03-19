import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
<<<<<<< HEAD
  app.enableCors(); 
  await app.listen(5000);
=======
  app.enableCors(); // (optional) Enable CORS if needed
  await app.listen(8080);
>>>>>>> 753239b82f0c7990c77b01d6801b89a353c44c08
}
bootstrap();
