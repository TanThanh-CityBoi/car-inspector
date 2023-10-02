import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { join } from 'path';
import * as fs from 'fs';

import { CarInspection, Cars, UnsatisCriteria } from './entities';
import { BaseService } from '@/base/base.servicce';
import { CreateInspectionDto } from './dto';
import { nanoid } from 'nanoid';

@Injectable()
export class CarsService extends BaseService<Cars> {
  constructor(
    @InjectRepository(Cars)
    public carRepo: Repository<Cars>,

    @InjectRepository(CarInspection)
    public carInspectRepo: Repository<CarInspection>,

    @InjectRepository(UnsatisCriteria)
    public unsatisRepo: Repository<UnsatisCriteria>,
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

  async createInspection(body: CreateInspectionDto, reqUser: any) {
    const existedCar = await this.findOne({ id: body.carId });
    if (!existedCar) {
      throw new BadRequestException('Cars not found');
    }

    const totalScore = 223;
    const score = totalScore - body.unacceptList?.length;

    const newCarInspection = await this.carInspectRepo.save({
      carId: body.carId,
      inspectCode: nanoid(),
      score,
      createdBy: reqUser.id,
    });

    const newUnsatisCriteria = body.unacceptList?.map((item) => {
      if (!item?.note || !item?.id) {
        throw new BadRequestException('Payload wrong');
      }
      return {
        carInspectionId: newCarInspection.id,
        criteriaId: item?.id,
        content: item?.note,
      };
    });

    const savedUnsatisCriteria =
      await this.unsatisRepo.save(newUnsatisCriteria);

    return {
      ...newCarInspection,
      unsatisCriteria: savedUnsatisCriteria,
    };
  }

  async getInspectResult(inspectCode: string) {
    const result = await this.carInspectRepo
      .createQueryBuilder('inspect')
      .leftJoinAndSelect('inspect.car', 'car')
      .leftJoinAndSelect('inspect.creator', 'creator')
      .leftJoinAndSelect('inspect.unsatisCriteria', 'unsatisCriteria')
      .where('inspect.inspectCode = :inspectCode', { inspectCode })
      .getOne();

    return result;
  }

  async getInspectHistory(query: any) {
    const { search, page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    let condition = '';

    if (search) {
      condition += `${condition.length ? 'AND' : ''} 
      ( car_inspect.inspectCode LIKE :search
        OR car.name LIKE :search
        OR car.sku LIKE :search
        OR car.model LIKE :search )`;
    }

    const result = await this.carInspectRepo
      .createQueryBuilder('car_inspect')
      .leftJoinAndSelect('car_inspect.creator', 'creator')
      .leftJoinAndSelect('car_inspect.car', 'car')
      .leftJoinAndSelect('car_inspect.unsatisCriteria', 'unsatisCriteria')
      .where(condition, { search: `%${search}%` })
      .skip(skip)
      .take(limit)
      .orderBy('car_inspect.createdAt', 'DESC')
      .getManyAndCount();

    return {
      count: result[1],
      items: result[0],
    };
  }
}
