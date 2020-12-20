import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUserIfNotExist(@Body('idToken') idToken: string, @Res() res) {
    const { uid } = await this.userService.authFirebase(idToken);
    const user = await this.userService.signUpIfNotExist(uid);

    if (user) {
      const sessionCookie = await this.userService.createSessionCookie(idToken);

      const options = {
        maxAge: this.userService.expiresIn,
      };
      res.cookie(this.userService.sessionCookieName, sessionCookie, options);
      res.send('OK');
    } else {
      res.status(401).send('UNAUTHORIZED REQUEST!');
    }
  }
}
