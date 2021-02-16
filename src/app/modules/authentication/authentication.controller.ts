import { Body, Controller, Get, Post, Query, Redirect, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { Public } from '~core/authorization';
import { AuthenticationService, AuthenticationUser } from './authentication.service';
import { RefreshDto } from './dto/refresh.dto';
import { GoogleOAuth2Guard } from './google-oauth2.guard';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

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
  async connectionValidate(@Req() request: Request) {
    return this.authService.signIn(<AuthenticationUser>request.user);
  }

  @Post('refresh')
  @Public()
  async refresh(@Body() body: RefreshDto) {
    return this.authService.refresh(body);
  }
}
