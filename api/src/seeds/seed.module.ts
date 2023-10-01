import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { databaseConfig, envConfig } from '@/configs';
import {
  SeedCarService,
  SeedRoleService,
  SeedService,
  SeedUserService,
} from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '@roles/entities/role.entity';
import { User } from '@users/entities/user.entity';
import { CarInspection, Cars, UnsatisCriteria } from '@cars/entities';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development', '.env'],
      isGlobal: true,
      load: [databaseConfig, envConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        ...configService.get('database'),
        entities: [User, Role, Cars, CarInspection, UnsatisCriteria],
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [SeedService, SeedCarService, SeedUserService, SeedRoleService],
})
export class SeedModule {}
