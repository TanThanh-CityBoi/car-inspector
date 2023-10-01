import {
  BadRequestException,
  UnauthorizedException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { IJwtPayload } from '@/interfaces';
import { UsersService } from '@users/users.service';
import { AuthToken } from './entities/auth-token.entity';
import { LoginDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private userService: UsersService,

    @InjectRepository(AuthToken)
    public authTokenRepo: Repository<AuthToken>,

    private readonly config: ConfigService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const userInfo = await this.userService.getProfile({
      username: loginDto.username,
    });
    if (!userInfo) {
      throw new BadRequestException('username or password is not correct');
    }

    const isCorrectPass = bcrypt.compareSync(
      loginDto.password,
      userInfo?.password,
    );
    if (!isCorrectPass) {
      throw new UnauthorizedException('username or password is not correct');
    }

    const payload: IJwtPayload = {
      sub: userInfo.id,
      username: userInfo.username,
      role: userInfo?.role?.name,
    };
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.config.get('jwtAccessExpire'),
      secret: this.config.get('jwtAccessKey'),
    });
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.config.get('jwtRefreshExpire'),
      secret: this.config.get('jwtRefreshKey'),
    });

    await this.authTokenRepo.save({
      userId: userInfo.id,
      accessToken,
      refreshToken,
    });

    return {
      accessToken,
      refreshToken,
      userId: userInfo.id,
    };
  }

  async renewAccessToken(token: string, payload: IJwtPayload) {
    const authToken = await this.authTokenRepo.findOne({
      where: {
        userId: payload.sub,
        refreshToken: token,
        deletedAt: null,
      },
    });
    if (!authToken) {
      throw new BadRequestException({ message: 'Invalid token' });
    }

    const newAccessToken = this.jwtService.sign(payload, {
      expiresIn: this.config.get('jwtAccessExpire'),
      secret: this.config.get('jwtAccessKey'),
    });
    const newRefreshToken = this.jwtService.sign(payload, {
      expiresIn: this.config.get('jwtRefreshExpire'),
      secret: this.config.get('jwtRefreshKey'),
    });

    await this.authTokenRepo.update(
      { id: authToken.id },
      {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      },
    );

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      userId: payload.sub,
    };
  }

  getRefreshToken(userId: number, token: string) {
    return this.authTokenRepo.findOne({
      where: {
        userId,
        refreshToken: token,
        deletedAt: null,
      },
    });
  }
}
