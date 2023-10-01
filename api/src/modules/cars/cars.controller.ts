import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { CarsService } from './cars.service';
import { _response } from '@/utils/response';
import { JwtAccessTokenGuard } from '@auth/guards/jwt-access-token.guard';

@Controller('api/cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @UseGuards(JwtAccessTokenGuard)
  @Get('detail/:sku')
  async getDetail(@Param('id') sku: string) {
    const result = await this.carsService.findOne({ sku });
    return _response({ data: result });
  }

  @UseGuards(JwtAccessTokenGuard)
  @Get('get-list')
  async getList(@Query() query: any) {
    const result = await this.carsService.getList(query);
    return _response({ data: result });
  }

  @UseGuards(JwtAccessTokenGuard)
  @Get('get-criteria')
  async getInspectionCriteria() {
    const result = await this.carsService.getInspectionCriteria();
    return _response({ data: result });
  }
}
