import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';

import { AuthService } from '@auth/auth.service';
import { getBearerToken } from '@/utils/function';
import { IJwtPayload } from '@/interfaces';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_REFRESH_KEY,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: IJwtPayload) {
    const token = getBearerToken(req);
    const validated = await this.authService.validateToken(token);
    if (!validated) {
      throw new UnauthorizedException({ message: 'Invalid token' });
    }
    const newToken = await this.authService.renewAccessToken(payload);

    return newToken;
  }
}
