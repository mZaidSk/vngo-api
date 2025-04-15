import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/modules/auth/decorators/current-user.decorator';

@Controller('activities')
@UseGuards(AuthGuard('jwt'))
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Post()
  create(
    @Body() createActivityDto: CreateActivityDto,
    @CurrentUser() user: any,
  ) {
    const userId = user.userId;
    return this.activityService.create(userId, createActivityDto);
  }

  @Get()
  findAll(
    @Query('ngoId') ngoId?: string,
    @Query('userId') userId?: string,
    @Query('upcoming') upcoming?: boolean,
  ) {
    if (ngoId) {
      return this.activityService.findByNgoId(ngoId);
    }
    if (userId) {
      return this.activityService.findByUserId(userId);
    }
    if (upcoming) {
      return this.activityService.findUpcomingActivities();
    }
    return this.activityService.findAll();
  }

  @Get('/ngo')
  findNgoAll(@CurrentUser() user: any) {
    return this.activityService.findByNgoId(user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.activityService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateActivityDto: UpdateActivityDto,
  ) {
    return this.activityService.update(id, updateActivityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.activityService.remove(id);
  }

  // @Post(':id/register')
  // register(
  //   @Param('id') activityId: string,
  //   @Body() registerDto: RegisterForActivityDto
  // ) {
  //   return this.activityService.registerForActivity(activityId, registerDto.userId);
  // }

  // @Delete(':id/register/:userId')
  // cancelRegistration(
  //   @Param('id') activityId: string,
  //   @Param('userId') userId: string
  // ) {
  //   return this.activityService.cancelRegistration(activityId, userId);
  // }

  // @Get(':id/participants')
  // getParticipants(@Param('id') activityId: string) {
  //   return this.activityService.getActivityParticipants(activityId);
  // }
}
