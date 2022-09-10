import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

const logger = new Logger();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(3000);

  logger.log('API Gateway is listening', 'Initialization');
}
bootstrap();
