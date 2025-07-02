import { Model } from 'mongoose';
import { Resident } from './schemas/resident.schema';
import { CreateResidentDto } from './dto/create-resident.dto';
import { UpdateResidentDto } from './dto/update-resident.dto';
import { VitalSignDto } from './dto/vital-sign.dto';
import { CarePlanDto } from './dto/care-plan.dto';
import { ActivityDto } from './dto/activity.dto';
import { MedicationDto } from './dto/medication.dto';
export declare class ResidentsService {
    private residentModel;
    constructor(residentModel: Model<Resident>);
    create(createResidentDto: CreateResidentDto): Promise<Resident>;
    findAll(): Promise<Resident[]>;
    findOne(id: string): Promise<Resident>;
    update(id: string, updateResidentDto: UpdateResidentDto): Promise<Resident>;
    remove(id: string): Promise<Resident>;
    assignBed(residentId: string, bedId: string): Promise<{
        message: string;
    }>;
    updateFamilyMember(residentId: string, familyMemberId: string): Promise<Resident>;
    recordVitalSign(vitalSignDto: VitalSignDto): Promise<any>;
    getVitalSigns(residentId: string): Promise<any[]>;
    recordActivity(activityDto: ActivityDto): Promise<any>;
    getActivities(residentId: string): Promise<any[]>;
    addMedication(medicationDto: MedicationDto): Promise<import("mongoose").Document<unknown, {}, Resident, {}> & Resident & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getMedications(id: string): Promise<{
        medication_name: string;
        dosage: string;
        frequency: string;
    }[]>;
    updateMedication(residentId: string, medicationIndex: number, medicationDto: MedicationDto): Promise<import("mongoose").Document<unknown, {}, Resident, {}> & Resident & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    discontinueMedication(residentId: string, medicationIndex: number): Promise<import("mongoose").Document<unknown, {}, Resident, {}> & Resident & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    createCarePlan(residentId: string, carePlanDto: CarePlanDto): Promise<{
        message: string;
    }>;
    getCarePlans(residentId: string): Promise<{
        message: string;
    }>;
}
