import { Injectable } from '@nestjs/common';
import { hashSync } from 'bcrypt';

import { User } from '@users/entities/user.entity';
import { Role } from '@roles/entities/role.entity';
import { ROLES } from '@/common/roles';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SeedUserService {
  constructor(private readonly config: ConfigService) {}

  async createUser() {
    const roleAdmin = await Role.findOne({
      where: { name: ROLES.ADMIN },
    });
    const passwordHash = hashSync('123123', this.config.get('passwordSalt'));

    await User.save({
      roleId: roleAdmin.id,
      firstName: 'admin',
      lastName: 'vucar',
      username: 'admin',
      password: passwordHash,
      email: 'admin@gmail.com',
      avatar: null,
    });
  }
}
