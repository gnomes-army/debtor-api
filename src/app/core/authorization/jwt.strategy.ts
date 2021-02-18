import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { EnvironmentVariables } from '~core/types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(req: Request) => req.signedCookies.accessToken]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>(EnvironmentVariables.JWT_SECRET),
    });
  }

  async validate(payload: { sub: string }) {
    return { id: payload.sub };
  }
}
