import { Injectable, Logger } from '@nestjs/common';

import { SeedUserService, SeedRoleService } from '@/seeds/services';

@Injectable()
export class SeedService {
  constructor(
    private readonly seedUser: SeedUserService,
    private readonly seedRole: SeedRoleService,
  ) {}
  private logger = new Logger('SEED_SERVICE');

  async seed() {
    this.logger.verbose('Seeder running!!');

    console.log('========= Create roles:');
    await this.seedRole.createRoles();

    console.log('========= Create user:');
    await this.seedUser.createUser();
  }
}
