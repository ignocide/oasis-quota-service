import { Injectable, NestMiddleware } from '@nestjs/common';

// @TODO: 입출력 정보 프린트 하기
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    next();
  }
}
