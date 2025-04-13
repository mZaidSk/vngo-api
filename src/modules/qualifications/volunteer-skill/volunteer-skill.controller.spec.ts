import { Test, TestingModule } from '@nestjs/testing';
import { VolunteerSkillController } from './volunteer-skill.controller';
import { VolunteerSkillService } from './volunteer-skill.service';

describe('VolunteerSkillController', () => {
  let controller: VolunteerSkillController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VolunteerSkillController],
      providers: [VolunteerSkillService],
    }).compile();

    controller = module.get<VolunteerSkillController>(VolunteerSkillController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
