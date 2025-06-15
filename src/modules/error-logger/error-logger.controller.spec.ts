import { Test, TestingModule } from '@nestjs/testing';
import { ErrorLoggerController } from './error-logger.controller';
import { ErrorLoggerService } from './error-logger.service';

describe('ErrorLoggerController', () => {
  let controller: ErrorLoggerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ErrorLoggerController],
      providers: [ErrorLoggerService],
    }).compile();

    controller = module.get<ErrorLoggerController>(ErrorLoggerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
