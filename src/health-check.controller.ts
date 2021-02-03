import { Controller, Get } from '@nestjs/common';
import { Public } from '~modules/auth/decorators/public.decorator';

@Controller()
export class HealthCheckController {
  @Get()
  @Public()
  getRoot() {
    return {
      health: 'OK',
      message: `Hello! You are on the ${process.env.ENV} server.`,
    };
  }
}
