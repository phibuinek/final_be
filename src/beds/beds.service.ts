import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bed, BedStatus } from './schemas/bed.schema';
import { CreateBedDto } from './dto/create-bed.dto';
import { UpdateBedDto } from './dto/update-bed.dto';

@Injectable()
export class BedsService {
  constructor(@InjectModel(Bed.name) private bedModel: Model<Bed>) {}

  async create(createBedDto: CreateBedDto): Promise<Bed> {
    const createdBed = new this.bedModel(createBedDto);
    return createdBed.save();
  }

  async findAll(): Promise<Bed[]> {
    return this.bedModel.find().exec();
  }

  async findOne(id: string): Promise<Bed> {
    const bed = await this.bedModel.findById(id).exec();
    if (!bed) {
      throw new NotFoundException(`Bed with ID "${id}" not found`);
    }
    return bed;
  }

  async update(id: string, updateBedDto: UpdateBedDto): Promise<Bed> {
    const existingBed = await this.bedModel
      .findByIdAndUpdate(id, updateBedDto, { new: true })
      .exec();
    if (!existingBed) {
      throw new NotFoundException(`Bed with ID "${id}" not found`);
    }
    return existingBed;
  }

  async remove(id: string): Promise<{ deleted: boolean; message?: string }> {
    const result = await this.bedModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Bed with ID "${id}" not found`);
    }
    return { deleted: true };
  }

  async updateStatus(id: string, status: BedStatus): Promise<Bed> {
    return this.update(id, { status });
  }

  // 🔧 New method needed by CarePlansService
  async findAvailableBedInRoom(roomId: string): Promise<Bed | null> {
    return this.bedModel.findOne({
      room: roomId,
      status: BedStatus.AVAILABLE
    }).exec();
  }

  // 🔧 Additional helper methods
  async findByRoom(roomId: string): Promise<Bed[]> {
    return this.bedModel.find({ room: roomId }).exec();
  }

  async findAvailableBeds(): Promise<Bed[]> {
    return this.bedModel.find({ status: BedStatus.AVAILABLE }).exec();
  }
} 