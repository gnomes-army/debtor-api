import { Controller, Get, Query, Redirect, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { SerializeDto } from '~src/app/core/decorators';
import { AuthenticationService } from './authentication.service';
import { GoogleOAuth2User } from './authentication.strategy';
import { ValidateQueryDto } from './dto/validate-query.dto';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Get()
  @UseGuards(AuthGuard('google'))
  auth() {}

  /**
   * Temp
   */
  @Get('redirect')
  @Redirect()
  redirect(@Query('code') code: string) {
    return {
      url: `http://localhost:3000/auth/validate?code=${encodeURIComponent(
        code,
      )}&redirectUri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fredirect`,
    };
  }

  @Get('validate')
  @UseGuards(AuthGuard('google'))
  @SerializeDto()
  async connectionValidate(@Req() request: Request, @Query() _query: ValidateQueryDto) {
    const googleUser = <GoogleOAuth2User>request.user;

    await this.authenticationService.processAuthorizationRequest(<GoogleOAuth2User>request.user);

    // const currentUser = await this.currentUserService.findByProviderId(validateResponse.id);

    return googleUser;

    // return new ValidateResponseDto({
    //   accessToken: validateResponse.accessToken,
    //   user: new CurrentUserDto({ ...currentUser }),
    // });
  }
}
