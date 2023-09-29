import { EntityId } from 'typeorm/repository/EntityId';
import { DeleteResult, FindOptionsWhere } from 'typeorm';

export interface IBaseService<T> {
  index(): Promise<T[]>;

  findById(id: EntityId): Promise<T>;

  findOne(condition: FindOptionsWhere<T>): Promise<T>;

  findByIds(id: [EntityId]): Promise<T[]>;

  store(data: any): Promise<T>;

  update(id: EntityId, data: any): Promise<T>;

  delete(id: EntityId): Promise<DeleteResult>;
}
