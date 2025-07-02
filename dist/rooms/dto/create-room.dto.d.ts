import { RoomType, RoomStatus } from '../schemas/room.schema';
export declare class CreateRoomDto {
    name: string;
    floor: number;
    type: RoomType;
    capacity: number;
    status?: RoomStatus;
    description?: string;
    notes?: string;
}
