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
    const [roleAdmin, roleMechanical, roleUser] = await Promise.all([
      Role.findOne({
        where: { name: ROLES.ADMIN },
      }),
      Role.findOne({
        where: { name: ROLES.MECHANICAL },
      }),
      Role.findOne({
        where: { name: ROLES.USER },
      }),
    ]);
    const passwordHash = hashSync('123123', this.config.get('passwordSalt'));

    await User.save([
      {
        roleId: roleAdmin.id,
        firstName: 'admin',
        lastName: 'vucar',
        username: 'admin',
        password: passwordHash,
        email: 'admin@gmail.com',
        avatar: null,
      },
      {
        roleId: roleMechanical.id,
        firstName: 'mechanical',
        lastName: 'vucar',
        username: 'mechanical',
        password: passwordHash,
        email: 'mechanical@gmail.com',
        avatar: null,
      },
      {
        roleId: roleUser.id,
        firstName: 'user',
        lastName: 'vucar',
        username: 'user',
        password: passwordHash,
        email: 'user@gmail.com',
        avatar: null,
      },
    ]);
  }
}
