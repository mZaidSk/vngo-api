import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { generateCertificate } from './certificate-generator.service';
import { Application } from './entities/application.entity';
import { Certificate } from './entities/certificate.entity';
import { User } from 'src/modules/users/entities/user.entity';

import { VolunteerProfile } from 'src/modules/profile/volunteer-profile/entities/volunteer-profile.entity';
import { Activity } from '../activity/entities/activity.entity';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(Application)
    private applicationRepository: Repository<Application>,

    @InjectRepository(Certificate)
    private certificateRepository: Repository<Certificate>,

    @InjectRepository(Activity)
    private activityRepository: Repository<Activity>,

    @InjectRepository(VolunteerProfile)
    private volunteerProfileRepository: Repository<VolunteerProfile>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // Create a new application
  async create(createApplicationDto: CreateApplicationDto) {
    try {
      const { volunteer_profile_id, activity_id } = createApplicationDto;

      // Check if the volunteer profile exists
      const volunteerProfile = await this.volunteerProfileRepository.findOne({
        where: { profile_id: volunteer_profile_id },
      });

      // Check if the activity exists
      const activity = await this.activityRepository.findOne({
        where: { id: activity_id },
      });

      if (!volunteerProfile || !activity) {
        throw new Error('Invalid volunteer profile or activity');
      }

      // Check if spots are available
      if (activity.spotsLeft <= 0) {
        throw new Error('No spots left for this activity');
      }

      // Check if application already exists
      const existingApplication = await this.applicationRepository.findOne({
        where: {
          volunteer_profile_id,
          activity_id,
        },
        relations: ['volunteerProfile', 'activity'],
      });

      if (existingApplication) {
        throw new Error(
          'Application already exists for this user and activity',
        );
      }

      // Decrease spotsLeft
      activity.spotsLeft -= 1;
      await this.activityRepository.save(activity);

      // Create and save new application
      const application =
        this.applicationRepository.create(createApplicationDto);
      await this.applicationRepository.save(application);

      return { message: 'Application created successfully', application };
    } catch (error) {
      throw new Error(`Failed to create application: ${error.message}`);
    }
  }

  // Find all applications
  async findAll() {
    try {
      const applications = await this.applicationRepository.find();
      return applications;
    } catch (error) {
      throw new Error(`Failed to fetch applications: ${error.message}`);
    }
  }

  // Find a single application by ID
  async findOne(id: string) {
    try {
      const application = await this.applicationRepository.findOne({
        where: { application_id: id },
        relations: ['volunteerProfile', 'activity', 'certificate'],
      });
      if (!application) {
        throw new Error('Application not found');
      }
      return application;
    } catch (error) {
      throw new Error(`Failed to fetch application: ${error.message}`);
    }
  }

  // Update an existing application
  async update(id: string, updateApplicationDto: UpdateApplicationDto) {
    try {
      const application = await this.applicationRepository.findOne({
        where: { application_id: id },
      });
      if (!application) {
        throw new Error('Application not found');
      }

      const updatedApplication = this.applicationRepository.merge(
        application,
        updateApplicationDto,
      );
      await this.applicationRepository.save(updatedApplication);

      return {
        message: 'Application updated successfully',
        updatedApplication,
      };
    } catch (error) {
      throw new Error(`Failed to update application: ${error.message}`);
    }
  }

  // Remove an application
  async remove(id: string) {
    try {
      const application = await this.applicationRepository.findOne({
        where: { application_id: id },
      });
      if (!application) {
        throw new Error('Application not found');
      }

      await this.applicationRepository.remove(application);
      return { message: 'Application removed successfully' };
    } catch (error) {
      throw new Error(`Failed to remove application: ${error.message}`);
    }
  }

  // Generate certificate and assign it to the application
  async generateApplicationCertificate(userId: string, applicationId: string) {
    try {
      // Fetch user info
      const user = await this.userRepository.findOne({
        where: { user_id: userId },
      });
      if (!user) {
        throw new Error('User not found');
      }

      // Fetch application along with related activity
      const application = await this.applicationRepository.findOne({
        where: { application_id: applicationId },
        relations: ['activity'],
      });

      if (!application) {
        throw new Error('Application not found');
      }

      const userName = user.name;
      const activityName = application.activity.title;

      // Generate the certificate file (PDF/image)
      const certificatePath = await generateCertificate(userName, activityName);
      const downloadUrl = `http://localhost:3000${certificatePath}`; // Consider making the base URL configurable

      // Create and save certificate entity
      const certificate = this.certificateRepository.create({
        title: `Certificate for ${activityName}`,
        description: `${userName} has successfully participated in ${activityName}.`,
        file_url: downloadUrl,
        user_id: userId,
      });

      await this.certificateRepository.save(certificate);

      // Assign the certificate to the application
      application.certificate = certificate;
      application.certificate_id = certificate.certificate_id;
      await this.applicationRepository.save(application);

      return {
        message:
          'Certificate generated and assigned to application successfully',
        downloadUrl,
      };
    } catch (error) {
      throw new Error(`Failed to generate certificate: ${error.message}`);
    }
  }

  async getApplicationsByUser(userId: string) {
    try {
      const applications = await this.applicationRepository.find({
        where: {
          volunteerProfile: {
            user: {
              user_id: userId,
            },
          },
        },
        relations: ['volunteerProfile', 'activity', 'certificate'],
      });

      return applications;
    } catch (error) {
      throw new Error(
        `Failed to fetch applications for user ${userId}: ${error.message}`,
      );
    }
  }

  async getApplicationsByActivity(activityId: string) {
    try {
      const applications = await this.applicationRepository.find({
        where: {
          activity: {
            id: activityId,
          },
        },
        relations: ['volunteerProfile', 'activity', 'certificate'],
      });

      return applications;
    } catch (error) {
      throw new Error(
        `Failed to fetch applications for activity ${activityId}: ${error.message}`,
      );
    }
  }
}
