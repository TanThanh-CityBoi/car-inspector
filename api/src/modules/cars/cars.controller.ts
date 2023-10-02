import {
  Body,
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
  Request,
  Post,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { _response } from '@/utils/response';
import { JwtAccessTokenGuard } from '@auth/guards/jwt-access-token.guard';
import { RolesGuard } from '@auth/guards/roles.guard';
import { Roles } from '@auth/decorators/roles.decorator';
import { Role } from '@/common/roles';
import { CreateInspectionDto } from './dto';

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

  @UseGuards(JwtAccessTokenGuard, RolesGuard)
  @Roles(Role.MECHANICAL)
  @Post('create-inspection')
  async createInspection(@Body() body: CreateInspectionDto, @Request() req) {
    const result = await this.carsService.createInspection(body, req.user);
    return _response({ data: result });
  }

  @UseGuards(JwtAccessTokenGuard)
  @Get('inspect-result/:inspectCode')
  async getInspectResult(@Param('inspectCode') inspectCode: string) {
    const result = await this.carsService.getInspectResult(inspectCode);
    return _response({ data: result });
  }

  @UseGuards(JwtAccessTokenGuard)
  @Get('inspect-history')
  async getInspectHistory(@Query() query) {
    const result = await this.carsService.getInspectHistory(query);
    return _response({ data: result });
  }
}
