import { Controller, Get, Query, Redirect, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { SerializeDto } from '~src/app/core/decorators';
import { AuthService, AuthUser } from '../services/auth.service';
import { Public } from '../decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @Public()
  @UseGuards(AuthGuard('google'))
  auth() {}

  /**
   * Temp
   */
  @Get('google/redirect')
  @Public()
  @Redirect()
  redirect(@Query('code') code: string) {
    return {
      url: `http://localhost:3000/auth/google/validate?code=${encodeURIComponent(
        code,
      )}&redirectUri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fgoogle%2Fredirect`,
    };
  }

  @Get('google/validate')
  @Public()
  @UseGuards(AuthGuard('google'))
  @SerializeDto()
  async connectionValidate(@Req() request: Request) {
    return {
      accessToken: await this.authService.signIn(<AuthUser>request.user),
    };
  }
}
