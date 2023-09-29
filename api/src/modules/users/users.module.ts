import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { BaseService } from '@/base/base.servicce';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthModule } from '@auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => AuthModule),
    JwtModule.register({ secret: 'secret' }),
  ],
  controllers: [UsersController],
  providers: [UsersService, BaseService],
  exports: [UsersService, BaseService],
})
export class UsersModule {}
