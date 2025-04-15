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
import { NgoProfileService } from './ngo-profile.service';
import { CreateNgoProfileDto } from './dto/create-ngo-profile.dto';
import { UpdateNgoProfileDto } from './dto/update-ngo-profile.dto';
import { CurrentUser } from 'src/modules/auth/decorators/current-user.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('ngo-profile')
@UseGuards(AuthGuard('jwt'))
export class NgoProfileController {
  constructor(private readonly ngoProfileService: NgoProfileService) {}

  @Post()
  create(
    @Body() createNgoProfileDto: CreateNgoProfileDto,
    @CurrentUser() user: any,
  ) {
    const userId = user.userId;
    return this.ngoProfileService.create(userId, createNgoProfileDto);
  }

  @Get()
  findAll() {
    return this.ngoProfileService.findAll();
  }

  @Get('user')
  findByUserId(@CurrentUser() user: any) {
    const userId = user.userId;
    console.log(userId);
    return this.ngoProfileService.findByUserId(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ngoProfileService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateNgoProfileDto: UpdateNgoProfileDto,
  ) {
    return this.ngoProfileService.update(id, updateNgoProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ngoProfileService.remove(id);
  }
}
