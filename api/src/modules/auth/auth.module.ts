import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '@users/users.module';
import { AuthToken } from './entities/auth-token.entity';
import { JwtRefreshTokenStrategy } from './strategies/jwt-refresh-token.strategy';
import { JwtAccessTokenStrategy } from './strategies/jwt-access-token.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtAccessTokenGuard } from './guards/jwt-access-token.guard';
import { JwtRefreshTokenGuard } from './guards/jwt-refresh-token.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({ secret: '' }),
    forwardRef(() => UsersModule),
    TypeOrmModule.forFeature([AuthToken]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtAccessTokenGuard,
    JwtRefreshTokenGuard,
    JwtAccessTokenStrategy,
    JwtRefreshTokenStrategy,
  ],
})
export class AuthModule {}
