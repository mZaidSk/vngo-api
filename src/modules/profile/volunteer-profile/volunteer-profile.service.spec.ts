import { Test, TestingModule } from '@nestjs/testing';
import { VolunteerProfileService } from './volunteer-profile.service';

describe('VolunteerProfileService', () => {
  let service: VolunteerProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VolunteerProfileService],
    }).compile();

    service = module.get<VolunteerProfileService>(VolunteerProfileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
