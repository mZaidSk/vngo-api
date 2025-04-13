import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { VolunteerProfileService } from './volunteer-profile.service';
import { CreateVolunteerProfileDto } from './dto/create-volunteer-profile.dto';
import { UpdateVolunteerProfileDto } from './dto/update-volunteer-profile.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/modules/auth/decorators/current-user.decorator';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { Roles } from 'src/modules/auth/decorators/roles.decorator';
import { Role } from 'src/utils/roles.enum';

@Controller('volunteer-profile')
@UseGuards(AuthGuard('jwt'))
export class VolunteerProfileController {
  constructor(
    private readonly volunteerProfileService: VolunteerProfileService,
  ) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(Role.VOLUNTEER)
  create(
    @Body() createVolunteerProfileDto: CreateVolunteerProfileDto,
    @CurrentUser() user: any,
  ) {
    const userId = user.userId;
    return this.volunteerProfileService.create(
      userId,
      createVolunteerProfileDto,
    );
  }

  @Get()
  findAll() {
    return this.volunteerProfileService.findAll();
  }

  @Get(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.VOLUNTEER)
  findOne(@Param('id') id: string) {
    return this.volunteerProfileService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVolunteerProfileDto: UpdateVolunteerProfileDto,
  ) {
    return this.volunteerProfileService.update(id, updateVolunteerProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.volunteerProfileService.remove(id);
  }
}
