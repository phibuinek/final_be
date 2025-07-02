import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Resident } from './schemas/resident.schema';
import { CreateResidentDto } from './dto/create-resident.dto';
import { UpdateResidentDto } from './dto/update-resident.dto';
import { VitalSignDto } from './dto/vital-sign.dto';
import { CarePlanDto } from './dto/care-plan.dto';
import { ActivityDto } from './dto/activity.dto';
import { MedicationDto } from './dto/medication.dto';

@Injectable()
export class ResidentsService {
  constructor(
    @InjectModel(Resident.name) private residentModel: Model<Resident>,
  ) {}

  async create(createResidentDto: CreateResidentDto): Promise<Resident> {
    const createdResident = new this.residentModel(createResidentDto);
    return createdResident.save();
  }

  async findAll(): Promise<Resident[]> {
    return this.residentModel.find().populate('family_member_id', 'fullName phone').exec();
  }

  async findOne(id: string): Promise<Resident> {
    const resident = await this.residentModel.findById(id).populate('family_member_id', 'fullName phone').exec();
    if (!resident) {
      throw new NotFoundException(`Resident with ID ${id} not found`);
    }
    return resident;
  }

  async update(id: string, updateResidentDto: UpdateResidentDto): Promise<Resident> {
    const existingResident = await this.residentModel
      .findByIdAndUpdate(id, updateResidentDto, { new: true })
      .populate('family_member_id', 'fullName phone')
      .exec();

    if (!existingResident) {
      throw new NotFoundException(`Resident with ID ${id} not found`);
    }
    return existingResident;
  }

  async remove(id: string): Promise<Resident> {
    const deletedResident = await this.residentModel.findByIdAndDelete(id).exec();
    if (!deletedResident) {
      throw new NotFoundException(`Resident with ID ${id} not found`);
    }
    return deletedResident;
  }

  async assignBed(residentId: string, bedId: string): Promise<{ message: string }> {
    const resident = await this.residentModel.findById(residentId).exec();
    
    if (!resident) {
      throw new NotFoundException(`Resident with ID ${residentId} not found`);
    }

    return { message: 'Bed assignment should be handled through care plan assignments' };
  }

  async updateFamilyMember(residentId: string, familyMemberId: string): Promise<Resident> {
    const resident = await this.residentModel.findByIdAndUpdate(
      residentId,
      { family_member_id: familyMemberId },
      { new: true }
    ).populate('family_member_id', 'fullName phone').exec();
    
    if (!resident) {
      throw new NotFoundException(`Resident with ID ${residentId} not found`);
    }

    return resident;
  }

  async recordVitalSign(vitalSignDto: VitalSignDto): Promise<any> {
    const resident = await this.residentModel.findById(vitalSignDto.residentId).exec();
    
    if (!resident) {
      throw new NotFoundException(`Resident with ID ${vitalSignDto.residentId} not found`);
    }

    return {
      id: 'mock-vital-sign-id',
      ...vitalSignDto,
      recordedAt: vitalSignDto.recordedAt || new Date(),
    };
  }

  async getVitalSigns(residentId: string): Promise<any[]> {
    const resident = await this.residentModel.findById(residentId).exec();
    
    if (!resident) {
      throw new NotFoundException(`Resident with ID ${residentId} not found`);
    }

    return [
      {
        id: 'mock-vital-sign-id',
        residentId,
        temperature: 36.5,
        bloodPressure: '120/80',
        heartRate: 72,
        respiratoryRate: 16,
        oxygenSaturation: 98,
        notes: 'Normal vital signs',
        recordedAt: new Date(),
      },
    ];
  }

  async recordActivity(activityDto: ActivityDto): Promise<any> {
    const resident = await this.residentModel.findById(activityDto.residentId).exec();
    
    if (!resident) {
      throw new NotFoundException(`Resident with ID ${activityDto.residentId} not found`);
    }

    return {
      id: 'mock-activity-id',
      ...activityDto,
      createdAt: new Date(),
    };
  }

  async getActivities(residentId: string): Promise<any[]> {
    const resident = await this.residentModel.findById(residentId).exec();
    
    if (!resident) {
      throw new NotFoundException(`Resident with ID ${residentId} not found`);
    }

    return [
      {
        id: 'mock-activity-id',
        residentId,
        name: 'Morning Walk',
        description: 'A short walk in the garden',
        scheduledTime: new Date(),
        duration: '30 minutes',
        location: 'Garden',
        responsibleStaff: 'Staff Member',
        participated: true,
        participationNotes: 'Enjoyed the fresh air',
      },
    ];
  }

  async addMedication(medicationDto: MedicationDto) {
    const resident = await this.residentModel.findById(medicationDto.residentId);
    if (!resident) {
      throw new NotFoundException('Resident not found');
    }

    const medication = {
      medication_name: medicationDto.name,
      dosage: medicationDto.dosage,
      frequency: medicationDto.frequency
    };

    resident.current_medications.push(medication);
    return resident.save();
  }

  async getMedications(id: string) {
    const resident = await this.residentModel.findById(id);
    if (!resident) {
      throw new NotFoundException('Resident not found');
    }
    return resident.current_medications;
  }

  async updateMedication(residentId: string, medicationIndex: number, medicationDto: MedicationDto) {
    const resident = await this.residentModel.findById(residentId);
    if (!resident) {
      throw new NotFoundException('Resident not found');
    }

    if (medicationIndex < 0 || medicationIndex >= resident.current_medications.length) {
      throw new BadRequestException('Invalid medication index');
    }

    resident.current_medications[medicationIndex] = {
      medication_name: medicationDto.name,
      dosage: medicationDto.dosage,
      frequency: medicationDto.frequency
    };

    return resident.save();
  }

  async discontinueMedication(residentId: string, medicationIndex: number) {
    const resident = await this.residentModel.findById(residentId);
    if (!resident) {
      throw new NotFoundException('Resident not found');
    }

    if (medicationIndex < 0 || medicationIndex >= resident.current_medications.length) {
      throw new BadRequestException('Invalid medication index');
    }

    resident.current_medications.splice(medicationIndex, 1);
    return resident.save();
  }

  async createCarePlan(
    residentId: string,
    carePlanDto: CarePlanDto,
  ): Promise<{ message: string }> {
    const resident = await this.residentModel.findById(residentId);
    if (!resident) {
      throw new NotFoundException(`Resident with ID ${residentId} not found`);
    }

    return { message: 'Care plans should be handled through CarePlansService assignments' };
  }

  async getCarePlans(residentId: string): Promise<{ message: string }> {
    const resident = await this.findOne(residentId);
    
    return { message: 'Care plans should be queried through CarePlansService assignments' };
  }
} 