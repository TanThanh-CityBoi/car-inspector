import { BaseService } from '@/base/base.servicce';
import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService extends BaseService<User> {
  constructor(
    @InjectRepository(User)
    public userRepository: Repository<User>,
  ) {
    super(userRepository);
  }

  getProfile(id: number) {
    return this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role')
      .where('user.id = :userId', { userId: id })
      .getOne();
  }
}
