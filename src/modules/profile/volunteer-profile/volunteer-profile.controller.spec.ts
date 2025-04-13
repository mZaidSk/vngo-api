import { Test, TestingModule } from '@nestjs/testing';
import { VolunteerProfileController } from './volunteer-profile.controller';
import { VolunteerProfileService } from './volunteer-profile.service';

describe('VolunteerProfileController', () => {
  let controller: VolunteerProfileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VolunteerProfileController],
      providers: [VolunteerProfileService],
    }).compile();

    controller = module.get<VolunteerProfileController>(VolunteerProfileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
