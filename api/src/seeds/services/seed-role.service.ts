import { Injectable } from '@nestjs/common';

import { Role } from '@roles/entities/role.entity';

@Injectable()
export class SeedRoleService {
  async createRoles() {
    const roles: any = [
      { name: 'admin' },
      { name: 'user' },
      { name: 'mechanical' },
    ];
    await Role.save(roles);
  }
}
