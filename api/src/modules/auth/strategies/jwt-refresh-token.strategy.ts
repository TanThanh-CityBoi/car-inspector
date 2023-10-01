import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';

import { AuthService } from '@auth/auth.service';
import { getBearerToken } from '@/utils/function';
import { IJwtPayload } from '@/interfaces';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(
    private readonly authService: AuthService,
    config: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('jwtRefreshKey'),
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: IJwtPayload) {
    const token = getBearerToken(req);
    const newToken = await this.authService.renewAccessToken(token, {
      sub: payload?.sub,
      username: payload?.username,
      role: payload?.role,
    });
    return newToken;
  }
}
