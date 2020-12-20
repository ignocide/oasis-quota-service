import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ReqUser } from './decorator/reqUser.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('ping')
  ping(@ReqUser() user) {
    return `${user.firebaseUid} say ping, I say pong`;
  }
}
