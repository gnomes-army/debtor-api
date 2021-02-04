import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class GoogleOAuth2Strategy extends PassportStrategy(Strategy, 'google') {
  constructor(configService: ConfigService) {
    super({
      clientID: configService.get<string>('GOOGLE_OAUTH2_CLIENT_ID'),
      clientSecret: configService.get<string>('GOOGLE_OAUTH2_CLIENT_SECRET'),
      callbackURL: '/',
      scope: ['email', 'profile'],
    });
  }

  authenticate(req: Request, options?: { [key: string]: string }) {
    const { redirectUri } = req.query;

    if (!redirectUri) {
      throw new UnprocessableEntityException('redirectUri is not provided');
    }

    super.authenticate(req, { ...options, callbackURL: redirectUri, prompt: 'login' });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ): Promise<void> {
    done(null, {
      email: profile.emails[0].value,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      avatar: profile.photos[0].value,
    });
  }
}
