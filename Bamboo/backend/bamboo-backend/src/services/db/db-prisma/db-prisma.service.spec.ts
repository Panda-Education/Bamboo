import { Test, TestingModule } from '@nestjs/testing';
import { DbPrismaService } from './db-prisma.service';

describe('DbPrismaService', () => {
  let service: DbPrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DbPrismaService],
    }).compile();

    service = module.get<DbPrismaService>(DbPrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
