import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ResidentsService } from './residents.service';
import { ResidentsController } from './residents.controller';
import { Resident, ResidentSchema } from './schemas/resident.schema';
import { DailyActivity, DailyActivitySchema } from './schemas/daily-activity.schema';
import { DailyActivitiesService } from './daily-activities.service';
import { DailyActivitiesController } from './daily-activities.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Resident.name, schema: ResidentSchema },
      { name: DailyActivity.name, schema: DailyActivitySchema }
    ]),
    UsersModule
  ],
  controllers: [ResidentsController, DailyActivitiesController],
  providers: [ResidentsService, DailyActivitiesService],
  exports: [ResidentsService],
})
export class ResidentsModule {} 