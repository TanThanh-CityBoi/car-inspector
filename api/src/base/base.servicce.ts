import { IBaseService } from '@/interfaces';
import {
  BaseEntity,
  DeleteResult,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  In,
  Repository,
} from 'typeorm';
import { EntityId } from 'typeorm/repository/EntityId';

export class BaseService<T extends BaseEntity> implements IBaseService<T> {
  constructor(public repository: Repository<T>) {}

  index(): Promise<T[]> {
    return this.repository.find();
  }

  findById(id: EntityId): Promise<T> {
    return this.repository.findOne({ id } as FindOneOptions<T>);
  }

  findOne(condition: FindOptionsWhere<T>): Promise<T> {
    return this.repository.findOne({
      where: condition,
    } as FindOneOptions<T>);
  }

  findByIds(ids: [EntityId]): Promise<T[]> {
    return this.repository.find({ id: In(ids) } as FindManyOptions<T>);
  }

  store(data: any): Promise<T> {
    return this.repository.save(data);
  }

  async update(id: EntityId, data: any): Promise<T> {
    await this.repository.update(id, data);
    return this.findById(id);
  }

  delete(id: EntityId): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
