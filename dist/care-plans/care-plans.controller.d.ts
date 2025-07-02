import { CarePlansService } from './care-plans.service';
export declare class CarePlansController {
    private readonly carePlansService;
    constructor(carePlansService: CarePlansService);
    getAvailableCarePlans(): Promise<{
        mainPackages: import("./schemas/care-plan.schema").CarePlan[];
        supplementaryPackages: import("./schemas/care-plan.schema").CarePlan[];
    }>;
    calculateCost(data: {
        carePlanIds: string[];
        roomType: string;
    }): Promise<{
        carePlansCost: number;
        roomCost: number;
        totalCost: number;
        breakdown: any[];
    }>;
    createAssignment(req: any, assignmentData: {
        residentId: string;
        familyMemberId: string;
        carePlanIds: string[];
        roomType: string;
        familyPreferences?: {
            preferred_room_gender?: string;
            preferred_floor?: number;
            special_requests?: string;
        };
        consultationNotes?: string;
        additionalMedications?: {
            medication_name: string;
            dosage: string;
            frequency: string;
        }[];
    }): Promise<import("./schemas/care-plan-assignment.schema").CarePlanAssignment>;
    getAssignments(req: any, status?: string, paymentStatus?: string, allStaff?: string): Promise<import("./schemas/care-plan-assignment.schema").CarePlanAssignment[]>;
    getAssignmentById(id: string): Promise<import("./schemas/care-plan-assignment.schema").CarePlanAssignment>;
    updatePaymentStatus(id: string, data: {
        paymentStatus: 'pending' | 'partially_paid' | 'fully_paid' | 'overdue';
        notes?: string;
    }): Promise<import("./schemas/care-plan-assignment.schema").CarePlanAssignment>;
    createCarePlan(carePlanData: {
        plan_name: string;
        description: string;
        monthly_price: number;
        plan_type: string;
        category: 'main' | 'supplementary';
        services_included: string[];
        staff_ratio: string;
        duration_type?: string;
        default_medications?: string[];
        prerequisites?: string[];
        contraindications?: string[];
    }): Promise<import("./schemas/care-plan.schema").CarePlan>;
}
