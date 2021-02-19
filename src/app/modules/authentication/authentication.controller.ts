import { Controller, Get, HttpCode, Query, Redirect, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { plainToClass } from 'class-transformer';
import { CookieOptions, Request, Response } from 'express';
import { CurrentUser, Public, User } from '~core/authorization';
import { Environment, EnvironmentVariables } from '~src/app/core/types';
import { AuthenticationService, AuthenticationUser } from './authentication.service';
import { AuthenticationResponseDto } from './dto/authentication-response.dto';
import { TokensPairDto } from './dto/tokens-pair.dto';
import { GoogleOAuth2Guard } from './google-oauth2.guard';

@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authService: AuthenticationService,
    private readonly configService: ConfigService,
  ) {}

  @Get('google')
  @Public()
  @UseGuards(GoogleOAuth2Guard)
  auth() {}

  /**
   * Temp
   */
  @Get('google/redirect')
  @Public()
  @Redirect()
  redirect(@Req() req: Request, @Query('code') code: string) {
    const host = `${req.protocol}://${req.get('host')}`;

    return {
      url: `${host}/auth/google/validate?code=${encodeURIComponent(
        code,
      )}&redirectUri=${encodeURIComponent(`${host}/auth/google/redirect`)}`,
    };
  }

  @Get('google/validate')
  @Public()
  @UseGuards(GoogleOAuth2Guard)
  async connectionValidate(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const tokens = await this.authService.signIn(<AuthenticationUser>req.user);
    return this.setCookiesAndRespond(res, tokens);
  }

  @Get('refresh')
  @Public()
  async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const tokens = await this.authService.refresh(
      req.signedCookies.accessToken,
      req.signedCookies.refreshToken,
    );
    return this.setCookiesAndRespond(res, tokens);
  }

  @Get('sign-out')
  @HttpCode(204)
  async signout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
  }

  @Get('current-user')
  async currentUser(@CurrentUser() user: User) {
    return this.authService.currentUser(user.id);
  }

  private setCookiesAndRespond(res: Response, tokens: TokensPairDto): AuthenticationResponseDto {
    const accessTokenExpires = new Date(
      Date.now() + this.configService.get<number>(EnvironmentVariables.JWT_ACCESS_TTL) * 1000,
    );

    const refreshTokenExpires = new Date(
      Date.now() + this.configService.get<number>(EnvironmentVariables.JWT_REFRESH_TTL) * 1000,
    );

    const local =
      this.configService.get<Environment>(EnvironmentVariables.ENV) === Environment.Local;

    const baseCookieOptions: CookieOptions = {
      httpOnly: true,
      signed: true,
      sameSite: local ? false : 'none',
      secure: !local,
      expires: refreshTokenExpires,
    };

    res.cookie('accessToken', tokens.accessToken, {
      expires: refreshTokenExpires,
      ...baseCookieOptions,
    });

    res.cookie('refreshToken', tokens.refreshToken, {
      path: '/auth/refresh',
      expires: refreshTokenExpires,
      ...baseCookieOptions,
    });

    return plainToClass(AuthenticationResponseDto, {
      expiresAt: accessTokenExpires.getTime(),
    });
  }
}
