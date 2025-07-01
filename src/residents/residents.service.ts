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
    try {
      const newResident = new this.residentModel(createResidentDto);
      return await newResident.save();
    } catch (error) {
      if (error.code === 11000) {
        // MongoDB duplicate key error
        const duplicateField = Object.keys(error.keyPattern)[0];
        throw new BadRequestException(`${duplicateField} already exists. Please use a different value.`);
      }
      throw error;
    }
  }

  async findAll(): Promise<Resident[]> {
    return this.residentModel.find().exec();
  }

  async findOne(id: string): Promise<Resident> {
    const resident = await this.residentModel.findById(id).exec();
    if (!resident) {
      throw new NotFoundException(`Resident with ID ${id} not found`);
    }
    return resident;
  }

  async update(id: string, updateResidentDto: UpdateResidentDto): Promise<Resident> {
    try {
      const updatedResident = await this.residentModel
        .findByIdAndUpdate(id, updateResidentDto, { new: true })
        .exec();
      
      if (!updatedResident) {
        throw new NotFoundException(`Resident with ID ${id} not found`);
      }
      
      return updatedResident;
    } catch (error) {
      if (error.code === 11000) {
        // MongoDB duplicate key error
        const duplicateField = Object.keys(error.keyPattern)[0];
        throw new BadRequestException(`${duplicateField} already exists. Please use a different value.`);
      }
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw error;
    }
  }

  async remove(id: string): Promise<Resident> {
    const deletedResident = await this.residentModel.findByIdAndDelete(id).exec();
    
    if (!deletedResident) {
      throw new NotFoundException(`Resident with ID ${id} not found`);
    }
    
    return deletedResident;
  }

  async assignBed(residentId: string, bedId: string): Promise<Resident> {
    const resident = await this.residentModel.findById(residentId).exec();
    
    if (!resident) {
      throw new NotFoundException(`Resident with ID ${residentId} not found`);
    }

    resident.bed = bedId as any;
    return resident.save();
  }

  async addFamilyMember(residentId: string, familyMemberId: string): Promise<Resident> {
    const resident = await this.residentModel.findById(residentId).exec();
    
    if (!resident) {
      throw new NotFoundException(`Resident with ID ${residentId} not found`);
    }

    if (!resident.familyMembers) {
      resident.familyMembers = [];
    }

    if (resident.familyMembers.includes(familyMemberId as any)) {
      throw new BadRequestException('Family member already associated with this resident');
    }

    resident.familyMembers.push(familyMemberId as any);
    return resident.save();
  }

  async removeFamilyMember(residentId: string, familyMemberId: string): Promise<Resident> {
    const resident = await this.residentModel.findById(residentId).exec();
    
    if (!resident) {
      throw new NotFoundException(`Resident with ID ${residentId} not found`);
    }

    if (!resident.familyMembers) {
      throw new BadRequestException('Resident has no family members');
    }

    const index = resident.familyMembers.indexOf(familyMemberId as any);
    if (index === -1) {
      throw new BadRequestException('Family member not associated with this resident');
    }

    resident.familyMembers.splice(index, 1);
    return resident.save();
  }

  // Vital Signs methods
  async recordVitalSign(vitalSignDto: VitalSignDto): Promise<any> {
    const resident = await this.residentModel.findById(vitalSignDto.residentId).exec();
    
    if (!resident) {
      throw new NotFoundException(`Resident with ID ${vitalSignDto.residentId} not found`);
    }

    // In a real application, this would save to a VitalSign collection
    // For now, we'll just return the DTO with a mock ID
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

    // In a real application, this would query the VitalSign collection
    // For now, we'll just return a mock response
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

  // Activity methods
  async recordActivity(activityDto: ActivityDto): Promise<any> {
    const resident = await this.residentModel.findById(activityDto.residentId).exec();
    
    if (!resident) {
      throw new NotFoundException(`Resident with ID ${activityDto.residentId} not found`);
    }

    // In a real application, this would save to an Activity collection
    // For now, we'll just return the DTO with a mock ID
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

    // In a real application, this would query the Activity collection
    // For now, we'll just return a mock response
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
      name: medicationDto.name,
      dosage: medicationDto.dosage,
      frequency: medicationDto.frequency,
      startDate: medicationDto.startDate,
      endDate: medicationDto.endDate,
      instructions: medicationDto.instructions,
      isActive: true
    };

    resident.medications.push(medication);
    return resident.save();
  }

  async getMedications(id: string) {
    const resident = await this.residentModel.findById(id);
    if (!resident) {
      throw new NotFoundException('Resident not found');
    }
    return resident.medications;
  }

  async updateMedication(residentId: string, medicationIndex: number, medicationDto: MedicationDto) {
    const resident = await this.residentModel.findById(residentId);
    if (!resident) {
      throw new NotFoundException('Resident not found');
    }

    if (medicationIndex < 0 || medicationIndex >= resident.medications.length) {
      throw new BadRequestException('Invalid medication index');
    }

    resident.medications[medicationIndex] = {
      name: medicationDto.name,
      dosage: medicationDto.dosage,
      frequency: medicationDto.frequency,
      startDate: medicationDto.startDate,
      endDate: medicationDto.endDate,
      instructions: medicationDto.instructions,
      isActive: true
    };

    return resident.save();
  }

  async discontinueMedication(residentId: string, medicationIndex: number) {
    const resident = await this.residentModel.findById(residentId);
    if (!resident) {
      throw new NotFoundException('Resident not found');
    }

    if (medicationIndex < 0 || medicationIndex >= resident.medications.length) {
      throw new BadRequestException('Invalid medication index');
    }

    resident.medications[medicationIndex].isActive = false;
    resident.medications[medicationIndex].endDate = new Date();

    return resident.save();
  }

  // Care Plan methods
  async createCarePlan(
    residentId: string,
    carePlanDto: CarePlanDto,
  ): Promise<Resident> {
    const carePlanData = {
      ...carePlanDto,
      actions: carePlanDto.actions || [],
      startDate: carePlanDto.startDate || new Date(),
    };

    const updatedResident = await this.residentModel.findByIdAndUpdate(
      residentId,
      { $push: { carePlans: carePlanData } },
      { new: true }
    ).exec();

    if (!updatedResident) {
      throw new NotFoundException(`Resident with ID ${residentId} not found`);
    }
    return updatedResident;
  }

  async getCarePlans(residentId: string): Promise<any> {
    const resident = await this.findOne(residentId);
    return resident.carePlans;
  }
} 