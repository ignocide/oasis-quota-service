import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import Entities from './entity';
import { MainModule } from './main.module';
import { UserModule } from './user/user.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { AuthMiddleware } from './middleware/auth.middleware';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NoteModule } from './note/note.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        ...configService.get<any>('database'),
        synchronize: true,
        entities: Entities,
      }),
    }),
    MainModule,
    UserModule,
    NoteModule,
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
