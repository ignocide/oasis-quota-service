import { Controller, Get } from '@nestjs/common';

@Controller('quota')
export class QuotaController {
  @Get()
  getHello(): string {
    return 'quota';
  }
}
