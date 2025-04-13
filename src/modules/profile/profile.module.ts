import { Module } from '@nestjs/common';
import { VolunteerProfileModule } from './volunteer-profile/volunteer-profile.module';
import { NgoProfileModule } from './ngo-profile/ngo-profile.module';

@Module({
  imports: [VolunteerProfileModule, NgoProfileModule],
  exports: [VolunteerProfileModule, NgoProfileModule],
})
export class ProfileModule {}
