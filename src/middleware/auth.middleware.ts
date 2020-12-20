import { Injectable, NestMiddleware } from '@nestjs/common';
import { User } from '../entity/user.entitiy';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: any, res: any, next: () => void) {
    const sessionCookie = req.cookies[this.userService.sessionCookieName];

    if (!sessionCookie) {
      // 로그인이 필요한 경우
      res.status(301).redirect('/login');
      return;
    }

    const uid = await this.userService.getUidBySessionCookie(sessionCookie);
    if (!uid) {
      // uid 정보가 유효하지 않은 경우
      res.status(401).send('UNAUTHORIZED REQUEST!');
    }

    let user: User | null = await this.userService.readByFirebaseUid(uid);
    if (user === null) {
      // firebase 인증은 되었지만 가입이 안되어 있는 경우
      user = await this.userService.signUpIfNotExist(uid);
    }

    if (!req.locals) {
      req.locals = {};
    }

    req.locals.user = user;
    next();
  }
}
