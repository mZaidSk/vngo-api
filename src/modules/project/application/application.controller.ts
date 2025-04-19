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
import { ApplicationService } from './application.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('application')
@UseGuards(AuthGuard('jwt'))
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  // Create a new application
  @Post()
  async create(@Body() createApplicationDto: CreateApplicationDto) {
    return this.applicationService.create(createApplicationDto);
  }

  // Get all applications
  @Get()
  async findAll() {
    return this.applicationService.findAll();
  }

  // Get a single application by ID
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.applicationService.findOne(id); // Updated to handle string ID
  }

  // Update an application by ID
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateApplicationDto: UpdateApplicationDto,
  ) {
    return this.applicationService.update(id, updateApplicationDto); // Updated to handle string ID
  }

  // Remove an application by ID
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.applicationService.remove(id); // Updated to handle string ID
  }

  // Generate and assign a certificate to an application
  @Post('certificate')
  async generateCertificate(
    @Body()
    body: {
      userId: string;
      userName: string;
      activityName: string;
      applicationId: string;
    },
  ) {
    const { userId, applicationId } = body;
    return this.applicationService.generateApplicationCertificate(
      userId,
      applicationId, // Pass the applicationId for certificate assignment
    );
  }

  @Get('user/:userId')
  async getUserApplications(@Param('userId') userId: string) {
    return this.applicationService.getApplicationsByUser(userId);
  }

  @Get('activity/:activityId')
  async getApplicationsByActivityId(@Param('activityId') activityId: string) {
    return this.applicationService.getApplicationsByActivity(activityId);
  }
}
