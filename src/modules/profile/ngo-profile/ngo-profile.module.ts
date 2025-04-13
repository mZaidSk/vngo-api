import { Module } from '@nestjs/common';
import { NgoProfileService } from './ngo-profile.service';
import { NgoProfileController } from './ngo-profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NGOProfile } from './entities/ngo-profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NGOProfile])],
  controllers: [NgoProfileController],
  providers: [NgoProfileService],
  exports: [NgoProfileService],
})
export class NgoProfileModule {}
