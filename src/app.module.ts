import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './config';
import Entities from './entity';
import { MainModule } from './main.module';
import { UserModule } from './user/user.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { AuthMiddleware } from './middleware/auth.middleware';

@Module({
  imports: [
    // @ts-ignore
    TypeOrmModule.forRoot({ ...config.database, entities: Entities }),
    MainModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'ping', method: RequestMethod.ALL });
    consumer
      .apply(AuthMiddleware)
      .exclude({ path: '/user', method: RequestMethod.POST })
      .forRoutes('*');
  }
}
