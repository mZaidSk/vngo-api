import { Test, TestingModule } from '@nestjs/testing';
import { NgoProfileController } from './ngo-profile.controller';
import { NgoProfileService } from './ngo-profile.service';

describe('NgoProfileController', () => {
  let controller: NgoProfileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NgoProfileController],
      providers: [NgoProfileService],
    }).compile();

    controller = module.get<NgoProfileController>(NgoProfileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
