import { ResidentsService } from './residents.service';
import { CreateResidentDto } from './dto/create-resident.dto';
import { UpdateResidentDto } from './dto/update-resident.dto';
import { VitalSignDto } from './dto/vital-sign.dto';
import { CarePlanDto } from './dto/care-plan.dto';
import { ActivityDto } from './dto/activity.dto';
import { MedicationDto } from './dto/medication.dto';
export declare class ResidentsController {
    private readonly residentsService;
    constructor(residentsService: ResidentsService);
    private validateObjectId;
    create(createResidentDto: CreateResidentDto): Promise<import("./schemas/resident.schema").Resident>;
    findAll(): Promise<import("./schemas/resident.schema").Resident[]>;
    findOne(id: string): Promise<import("./schemas/resident.schema").Resident>;
    update(id: string, updateResidentDto: UpdateResidentDto): Promise<import("./schemas/resident.schema").Resident>;
    remove(id: string): Promise<import("./schemas/resident.schema").Resident>;
    assignBed(id: string, bedId: string): Promise<{
        message: string;
    }>;
    updateFamilyMember(id: string, familyMemberId: string): Promise<import("./schemas/resident.schema").Resident>;
    recordVitalSign(id: string, vitalSignDto: VitalSignDto): Promise<any>;
    getVitalSigns(id: string): Promise<any[]>;
    createCarePlan(id: string, carePlanDto: CarePlanDto): Promise<{
        message: string;
    }>;
    getCarePlans(id: string): Promise<{
        message: string;
    }>;
    recordActivity(id: string, activityDto: ActivityDto): Promise<any>;
    getActivities(id: string): Promise<any[]>;
    addMedication(id: string, medicationDto: MedicationDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/resident.schema").Resident, {}> & import("./schemas/resident.schema").Resident & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getMedications(id: string): Promise<{
        medication_name: string;
        dosage: string;
        frequency: string;
    }[]>;
    updateMedication(id: string, index: number, medicationDto: MedicationDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/resident.schema").Resident, {}> & import("./schemas/resident.schema").Resident & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    discontinueMedication(id: string, index: number): Promise<import("mongoose").Document<unknown, {}, import("./schemas/resident.schema").Resident, {}> & import("./schemas/resident.schema").Resident & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
