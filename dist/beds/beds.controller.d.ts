import { BedsService } from './beds.service';
import { CreateBedDto } from './dto/create-bed.dto';
import { UpdateBedDto } from './dto/update-bed.dto';
export declare class BedsController {
    private readonly bedsService;
    constructor(bedsService: BedsService);
    create(createBedDto: CreateBedDto): Promise<import("./schemas/bed.schema").Bed>;
    findAll(): Promise<import("./schemas/bed.schema").Bed[]>;
    findOne(id: string): Promise<import("./schemas/bed.schema").Bed>;
    update(id: string, updateBedDto: UpdateBedDto): Promise<import("./schemas/bed.schema").Bed>;
    remove(id: string): Promise<{
        deleted: boolean;
        message?: string;
    }>;
}
