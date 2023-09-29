import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from '@users/users.service';

@Injectable()
export class JwtAccessTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-access-token',
) {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_ACCESS_KEY,
    });
  }

  async validate(req: Request, payload: any) {
    const { userId } = payload;
    if (!userId) {
      throw new UnauthorizedException('Invalid token');
    }
    const userInfo = await this.userService.getProfile(payload);
    return userInfo;
  }
}
