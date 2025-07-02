import { BedStatus } from '../schemas/bed.schema';
export declare class CreateBedDto {
    name: string;
    room: string;
    status?: BedStatus;
    notes?: string;
}
