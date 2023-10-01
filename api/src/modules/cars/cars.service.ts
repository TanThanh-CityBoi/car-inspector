import { BaseService } from '@/base/base.servicce';
import { Injectable } from '@nestjs/common';
import { Cars } from './entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import { join } from 'path';

@Injectable()
export class CarsService extends BaseService<Cars> {
  constructor(
    @InjectRepository(Cars)
    public carRepo: Repository<Cars>,
  ) {
    super(carRepo);
  }

  async getList(query: any) {
    const { search, status, page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    let condition = '';
    if (status == 0) {
      condition +=
        '( NOT EXISTS(select * FROM car_inspection WHERE car_inspection.car_id = car.id) )';
    }
    if (status == 1) {
      condition +=
        '( EXISTS(select * FROM car_inspection WHERE car_inspection.car_id = car.id) )';
    }

    if (search) {
      condition += `${condition.length ? 'AND' : ''} 
      ( car.name LIKE :search
        OR car.sku LIKE :search
        OR car.model LIKE :search )`;
    }

    const result = await this.carRepo
      .createQueryBuilder('car')
      .leftJoinAndSelect('car.inspections', 'inspections')
      .leftJoinAndSelect('inspections.creator', 'creator')
      .leftJoinAndSelect('inspections.unsatisCriteria', 'unsatisCriteria')
      .where(condition, { search: `%${search}%` })
      .skip(skip)
      .take(limit)
      .orderBy('car.createdAt', 'DESC')
      .getManyAndCount();

    return {
      count: result[1],
      items: result[0],
    };
  }

  async getInspectionCriteria() {
    const fileData = fs.readFileSync(
      join(__dirname, '../../common', 'inspect-criteria.json'),
      {
        encoding: 'utf8',
      },
    );
    const result = JSON.parse(fileData);
    return result;
  }
}
