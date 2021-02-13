import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Public } from '~core/authorization';
import { Environment, EnvironmentVariables } from '~core/types';

@Controller()
export class HealthCheckController {
  constructor(private readonly configService: ConfigService) {}

  @Get()
  @Public()
  getRoot() {
    const env = this.configService.get<Environment>(EnvironmentVariables.ENV);

    return {
      health: 'OK',
      message: `Hello! You are on the ${env} server.`,
    };
  }
}
