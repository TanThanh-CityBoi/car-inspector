import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CarsController } from './cars.controller';
import { CarInspection, Cars } from './entities';
import { CarsService } from './cars.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cars, CarInspection])],
  controllers: [CarsController],
  providers: [CarsService],
})
export class CarsModule {}
