import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';

import { SeedModule } from '@/seeds/seed.module';
import { SeedService } from '@/seeds/services';

async function bootstrap() {
  NestFactory.createApplicationContext(SeedModule)
    .then((appContext) => {
      const logger = new Logger('SEED_SERVICE');

      const seeder = appContext.get(SeedService);
      seeder
        .seed()
        .then(() => {
          logger.verbose('Seeding complete!');
        })
        .catch((error: any) => {
          logger.error('Seeding failed!');
          throw error;
        })
        .finally(() => appContext.close());
    })
    .catch((error) => {
      throw error;
    });
}

bootstrap();
