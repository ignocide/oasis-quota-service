import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { ResponseInterceeptor } from './interceptor/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    credentials: true,
    origin: ['http://localhost:3000', 'http://auth.oasis.com:3000'],
  });
  app.use(cookieParser());
  app.useGlobalInterceptors(new ResponseInterceeptor());
  await app.listen(5000);
}
bootstrap();
