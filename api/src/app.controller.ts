import { Controller, Get } from '@nestjs/common';

import { AppService } from '@/app.service';
import { IResponse } from '@/interfaces';
import { _response } from '@/utils/response';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): IResponse<any> {
    const result = this.appService.getHello();
    return _response({ data: result });
  }
}
