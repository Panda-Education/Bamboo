import { Test, TestingModule } from '@nestjs/testing';
import { PandaJwtService } from './panda-jwt.service';

describe('PandaJwtService', () => {
  let service: PandaJwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PandaJwtService],
    }).compile();

    service = module.get<PandaJwtService>(PandaJwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
