import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './decorator/user.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('ping')
  ping(@User() user) {
    return `${user.firebaseUid} say ping, I say pong`;
  }
}
