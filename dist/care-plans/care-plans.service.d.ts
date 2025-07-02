import { Model } from 'mongoose';
import { CarePlan } from './schemas/care-plan.schema';
import { CarePlanAssignment } from './schemas/care-plan-assignment.schema';
import { RoomsService } from '../rooms/rooms.service';
import { BedsService } from '../beds/beds.service';
export declare class CarePlansService {
    private carePlanModel;
    private assignmentModel;
    private roomsService;
    private bedsService;
    constructor(carePlanModel: Model<CarePlan>, assignmentModel: Model<CarePlanAssignment>, roomsService: RoomsService, bedsService: BedsService);
    getAvailableCarePlans(): Promise<{
        mainPackages: CarePlan[];
        supplementaryPackages: CarePlan[];
    }>;
    calculateCost(carePlanIds: string[], roomType: string): Promise<{
        carePlansCost: number;
        roomCost: number;
        totalCost: number;
        breakdown: any[];
    }>;
    createAssignment(assignmentData: {
        staffId: string;
        residentId: string;
        familyMemberId: string;
        carePlanIds: string[];
        roomType: string;
        familyPreferences?: any;
        consultationNotes?: string;
        additionalMedications?: any[];
    }): Promise<CarePlanAssignment>;
    getAssignments(filters?: {
        staffId?: string;
        status?: string;
        paymentStatus?: string;
    }): Promise<CarePlanAssignment[]>;
    updatePaymentStatus(assignmentId: string, paymentStatus: string, notes?: string): Promise<CarePlanAssignment>;
    createCarePlan(carePlanData: Partial<CarePlan>): Promise<CarePlan>;
    getAssignmentById(assignmentId: string): Promise<CarePlanAssignment>;
}
