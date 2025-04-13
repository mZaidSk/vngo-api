import { Test, TestingModule } from '@nestjs/testing';
import { NgoProfileService } from './ngo-profile.service';

describe('NgoProfileService', () => {
  let service: NgoProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NgoProfileService],
    }).compile();

    service = module.get<NgoProfileService>(NgoProfileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
