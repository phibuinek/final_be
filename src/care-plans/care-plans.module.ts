import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CarePlansService } from './care-plans.service';
import { CarePlansController } from './care-plans.controller';
import { CarePlan, CarePlanSchema } from './schemas/care-plan.schema';
import { CarePlanAssignment, CarePlanAssignmentSchema } from './schemas/care-plan-assignment.schema';
import { RoomsModule } from '../rooms/rooms.module';
import { BedsModule } from '../beds/beds.module';
import { UsersModule } from '../users/users.module';
import { ResidentsModule } from '../residents/residents.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CarePlan.name, schema: CarePlanSchema },
      { name: CarePlanAssignment.name, schema: CarePlanAssignmentSchema }
    ]),
    RoomsModule,
    BedsModule,
    UsersModule,
    ResidentsModule
  ],
  controllers: [CarePlansController],
  providers: [CarePlansService],
  exports: [CarePlansService],
})
export class CarePlansModule {} 