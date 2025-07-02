import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomStatus } from './schemas/room.schema';
export declare class RoomsController {
    private readonly roomsService;
    constructor(roomsService: RoomsService);
    create(createRoomDto: CreateRoomDto): Promise<import("./schemas/room.schema").Room>;
    findAll(floor?: number, status?: RoomStatus): Promise<import("./schemas/room.schema").Room[]>;
    getStatistics(): Promise<any>;
    findOne(id: string): Promise<import("./schemas/room.schema").Room>;
    update(id: string, updateRoomDto: UpdateRoomDto): Promise<import("./schemas/room.schema").Room>;
    updateStatus(id: string, statusDto: {
        status: RoomStatus;
    }): Promise<import("./schemas/room.schema").Room>;
    remove(id: string): Promise<{
        deleted: boolean;
        message?: string;
    }>;
}
