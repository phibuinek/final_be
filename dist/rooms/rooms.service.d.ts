import { Model } from 'mongoose';
import { Room, RoomStatus } from './schemas/room.schema';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
export declare class RoomsService {
    private roomModel;
    constructor(roomModel: Model<Room>);
    create(createRoomDto: CreateRoomDto): Promise<Room>;
    findAll(): Promise<Room[]>;
    findOne(id: string): Promise<Room>;
    findByFloor(floor: number): Promise<Room[]>;
    findByStatus(status: RoomStatus): Promise<Room[]>;
    update(id: string, updateRoomDto: UpdateRoomDto): Promise<Room>;
    remove(id: string): Promise<{
        deleted: boolean;
        message?: string;
    }>;
    updateStatus(id: string, status: RoomStatus): Promise<Room>;
    getRoomStatistics(): Promise<any>;
    findAvailableRoom(roomType: string): Promise<Room | null>;
    findAvailableRoomByType(roomType: string): Promise<Room | null>;
}
