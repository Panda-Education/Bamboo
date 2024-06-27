import { Test, TestingModule } from '@nestjs/testing';
import { VerifyController } from './verify.controller';

describe('VerifyController', () => {
  let controller: VerifyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VerifyController],
    }).compile();

    controller = module.get<VerifyController>(VerifyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
