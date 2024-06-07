import { Test, TestingModule } from '@nestjs/testing';
import { PrismaRequestService } from './prisma-requests.service';

describe('PrismaRequestService', () => {
  let service: PrismaRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaRequestService],
    }).compile();

    service = module.get<PrismaRequestService>(PrismaRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
