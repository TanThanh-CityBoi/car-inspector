import { Injectable, Logger } from '@nestjs/common';

import {
  SeedUserService,
  SeedRoleService,
  SeedCarService,
} from '@/seeds/services';

@Injectable()
export class SeedService {
  constructor(
    private readonly seedUser: SeedUserService,
    private readonly seedCars: SeedCarService,
    private readonly seedRole: SeedRoleService,
  ) {}
  private logger = new Logger('SEED_SERVICE');

  async seed() {
    try {
      this.logger.verbose('Seeder running!!');

      console.log('========= Create roles:');
      await this.seedRole.createRoles();

      console.log('========= Create user:');
      await this.seedUser.createUser();

      console.log('========= Create cars:');
      await this.seedCars.createCars();
    } catch (err) {
      this.logger.error(err);
    }
  }
}
