import { Test, TestingModule } from '@nestjs/testing';
import { HealthCheckController } from './health-check.controller';

describe('HealthCheckController', () => {
  let controller: HealthCheckController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthCheckController],
    }).compile();

    controller = module.get<HealthCheckController>(HealthCheckController);
  });

  it('should return OK status', () => {
    expect(controller.getRoot()).toMatchObject({
      health: 'OK',
      message: `Hello! You are on the ${process.env.ENV} server.`,
    });
  });
});
