import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';

export interface GoogleOAuth2User {
  email: string;
  firstName: string;
  lastName: string;
  picture: string;
}

@Injectable()
export class AuthenticationStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(public readonly configService: ConfigService) {
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
    const user: GoogleOAuth2User = {
      email: profile.emails[0].value,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      picture: profile.photos[0].value,
    };
    done(null, user);
  }

  // constructor() {
  //   super({
  //     domain: process.env.AUTH0_CUSTOM_DOMAIN,
  //     clientID: process.env.AUTH0_CLIENT_ID,
  //     clientSecret: process.env.AUTH0_CLIENT_SECRET,
  //     callbackURL: '/',
  //     scope: 'openid',
  //   });
  // }

  // authenticate(req: Request, options: { [key: string]: string }) {
  //   const { connection } = req.params;

  //   const auth0Connection = Auth0ConnectionEnum[connection];

  //   if (!auth0Connection) {
  //     throw new UnprocessableEntityException('Unsupported connection');
  //   }

  //   const { redirectUri, mode } = req.query;

  //   if (!redirectUri) {
  //     throw new UnprocessableEntityException('redirectUri id not provided');
  //   }

  //   super.authenticate(req, {
  //     ...options,
  //     connection: auth0Connection,
  //     callbackURL: redirectUri,
  //     prompt: 'login',
  //     mode,
  //   });
  // }

  // authorizationParams(options: { [key: string]: string }) {
  //   const params: { [key: string]: string } = {};

  //   if (options.connection && typeof options.connection === 'string') {
  //     params.connection = options.connection;

  //     if (options.connection_scope && typeof options.connection_scope === 'string') {
  //       params.connection_scope = options.connection_scope;
  //     }
  //   }
  //   if (options.audience && typeof options.audience === 'string') {
  //     params.audience = options.audience;
  //   }
  //   if (options.prompt && typeof options.prompt === 'string') {
  //     params.prompt = options.prompt;
  //   }
  //   if (options.login_hint && typeof options.login_hint === 'string') {
  //     params.login_hint = options.login_hint;
  //   }
  //   if (options.acr_values && typeof options.acr_values === 'string') {
  //     params.acr_values = options.acr_values;
  //   }
  //   if (options.mode && typeof options.mode === 'string') {
  //     params.mode = options.mode;
  //   }

  //   const strategyOptions = this.options;

  //   if (strategyOptions && typeof strategyOptions.maxAge === 'number') {
  //     params.max_age = strategyOptions.maxAge;
  //   }

  //   if (this.authParams && typeof this.authParams.nonce === 'string') {
  //     params.nonce = this.authParams.nonce;
  //   }

  //   return params;
  // }

  // async validate(
  //   _accessToken: string,
  //   _refreshToken: string,
  //   // eslint-disable-next-line camelcase
  //   extraParams: { id_token: string },
  //   profile: Profile,
  //   done: (error: any, user: Auth0StrategyValidateResponse) => void,
  // ) {
  //   done(null, { accessToken: extraParams.id_token, id: profile.id });
  // }
}
