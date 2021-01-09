import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
// @ts-ignore
import SpringCloudConfigClient from 'spring-cloud-config-client-js';
import * as dotenv from 'dotenv';
dotenv.config();

declare global {
  namespace NodeJS {
    interface Global {
      config: {};
    }
  }
}
export default global;

const springCloudConfigClient = new SpringCloudConfigClient({
  configServerUrl: process.env.CONFIG_SERVER_URL,
  auth: {
    username: process.env.CONFIG_SERVER_USERNAME,
    password: process.env.CONFIG_SERVER_PASSWORD,
  },
});

async function fetchConfig() {
  const config = await springCloudConfigClient.fetch({
    name: 'quota-service',
    profile: process.env.PROFILE,
  });

  global.config = config;
}

async function bootstrap() {
  await fetchConfig();
  const { AppModule } = await import('./app.module');
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    credentials: true,
    origin: 'http://localhost:3000',
  });
  app.use(cookieParser());
  await app.listen(5000);
}
bootstrap();
