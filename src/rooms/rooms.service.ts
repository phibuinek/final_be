import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room, RoomStatus } from './schemas/room.schema';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Injectable()
export class RoomsService {
  constructor(@InjectModel(Room.name) private roomModel: Model<Room>) {}

  async create(createRoomDto: CreateRoomDto): Promise<Room> {
    const createdRoom = new this.roomModel(createRoomDto);
    return createdRoom.save();
  }

  async findAll(): Promise<Room[]> {
    return this.roomModel.find().exec();
  }

  async findOne(id: string): Promise<Room> {
    const room = await this.roomModel.findById(id).exec();
    if (!room) {
      throw new NotFoundException(`Room with ID "${id}" not found`);
    }
    return room;
  }

  async findByFloor(floor: number): Promise<Room[]> {
    return this.roomModel.find({ floor }).exec();
  }

  async findByStatus(status: RoomStatus): Promise<Room[]> {
    return this.roomModel.find({ status }).exec();
  }

  async update(id: string, updateRoomDto: UpdateRoomDto): Promise<Room> {
    const existingRoom = await this.roomModel
      .findByIdAndUpdate(id, updateRoomDto, { new: true })
      .exec();
    if (!existingRoom) {
      throw new NotFoundException(`Room with ID "${id}" not found`);
    }
    return existingRoom;
  }

  async remove(id: string): Promise<{ deleted: boolean; message?: string }> {
    const result = await this.roomModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Room with ID "${id}" not found`);
    }
    return { deleted: true };
  }

  async updateStatus(id: string, status: RoomStatus): Promise<Room> {
    return this.update(id, { status });
  }

  async getRoomStatistics(): Promise<any> {
    const totalRooms = await this.roomModel.countDocuments().exec();
    const availableRooms = await this.roomModel.countDocuments({ status: RoomStatus.AVAILABLE }).exec();
    const fullRooms = await this.roomModel.countDocuments({ status: RoomStatus.FULL }).exec();
    const maintenanceRooms = await this.roomModel.countDocuments({ status: RoomStatus.MAINTENANCE }).exec();

    return {
      total: totalRooms,
      available: availableRooms,
      full: fullRooms,
      maintenance: maintenanceRooms,
      occupancyRate: totalRooms > 0 ? ((fullRooms / totalRooms) * 100).toFixed(2) : 0,
    };
  }

  // 🔧 New method needed by CarePlansService
  async findAvailableRoom(roomType: string): Promise<Room | null> {
    // For now, find any available room - you can enhance this with room type matching
    return this.roomModel.findOne({
      status: RoomStatus.AVAILABLE
    }).exec();
  }

  // 🔧 Enhanced method to find room by type (if you have room types in schema)
  async findAvailableRoomByType(roomType: string): Promise<Room | null> {
    return this.roomModel.findOne({
      status: RoomStatus.AVAILABLE,
      // Add room type filter if your Room schema has a type field
      // roomType: roomType
    }).exec();
  }
} 