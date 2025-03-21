import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*', // Adjust based on frontend URL
  });
  await app.listen(process.env.PORT ?? 6000);
}
bootstrap();
