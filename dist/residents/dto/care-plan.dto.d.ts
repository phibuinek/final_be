export declare class CarePlanDto {
    residentId: string;
    title: string;
    description?: string;
    goals?: string[];
    interventions?: string[];
    actions?: string[];
    startDate?: Date;
    endDate?: Date;
    responsibleStaff?: string;
}
