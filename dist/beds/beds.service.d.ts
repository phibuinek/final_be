import { Model } from 'mongoose';
import { Bed, BedStatus } from './schemas/bed.schema';
import { CreateBedDto } from './dto/create-bed.dto';
import { UpdateBedDto } from './dto/update-bed.dto';
export declare class BedsService {
    private bedModel;
    constructor(bedModel: Model<Bed>);
    create(createBedDto: CreateBedDto): Promise<Bed>;
    findAll(): Promise<Bed[]>;
    findOne(id: string): Promise<Bed>;
    update(id: string, updateBedDto: UpdateBedDto): Promise<Bed>;
    remove(id: string): Promise<{
        deleted: boolean;
        message?: string;
    }>;
    updateStatus(id: string, status: BedStatus): Promise<Bed>;
    findAvailableBedInRoom(roomId: string): Promise<Bed | null>;
    findByRoom(roomId: string): Promise<Bed[]>;
    findAvailableBeds(): Promise<Bed[]>;
}
