import { Test, TestingModule } from '@nestjs/testing';
import { VolunteerSkillService } from './volunteer-skill.service';

describe('VolunteerSkillService', () => {
  let service: VolunteerSkillService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VolunteerSkillService],
    }).compile();

    service = module.get<VolunteerSkillService>(VolunteerSkillService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
