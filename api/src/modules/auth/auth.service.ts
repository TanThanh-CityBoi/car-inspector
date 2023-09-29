import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { IJwtPayload } from '@/interfaces';
import { LoginDto } from './dto';
import { UsersService } from '@users/users.service';
import { AuthToken } from './entities/auth-token.entity';
import { ConfigService } from '@nestjs/config';

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
    const userInfo = await this.userService.findOne({
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

  validateToken(token: string) {
    return token ? true : false;
  }

  renewAccessToken(payload: IJwtPayload) {
    return {
      accessToken: '',
      refreshToken: '',
    };
  }
}
