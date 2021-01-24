import { Controller, Get } from '@nestjs/common';

@Controller()
export class HealthCheckController {
  @Get()
  getRoot() {
    return {
      health: 'OK',
      message: `Hello! You are on the ${process.env.ENV} server.`,
    };
  }
}
