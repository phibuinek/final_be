import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Visit, VisitStatus } from './schemas/visit.schema';
import { CreateVisitDto } from './dto/create-visit.dto';
import { UpdateVisitDto } from './dto/update-visit.dto';
import { VisitApprovalDto } from './dto/visit-approval.dto';

@Injectable()
export class VisitsService {
  constructor(@InjectModel(Visit.name) private visitModel: Model<Visit>) {}

  async create(createVisitDto: CreateVisitDto, familyMemberId: string): Promise<Visit> {
    // Check if the visit date is not in the past
    const scheduledDateTime = new Date(`${createVisitDto.scheduledDate}T${createVisitDto.scheduledTime}`);
    if (scheduledDateTime < new Date()) {
      throw new BadRequestException('Cannot schedule a visit in the past');
    }

    const visitData = {
      ...createVisitDto,
      familyMember: familyMemberId,
      scheduledDate: new Date(createVisitDto.scheduledDate),
    };

    const createdVisit = new this.visitModel(visitData);
    return createdVisit.save();
  }

  async findAll(): Promise<Visit[]> {
    return this.visitModel
      .find()
      .populate('resident', 'fullName')
      .populate('familyMember', 'name email')
      .populate('approvedBy', 'fullName')
      .exec();
  }

  async findByFamilyMember(familyMemberId: string): Promise<Visit[]> {
    return this.visitModel
      .find({ familyMember: familyMemberId })
      .populate('resident', 'fullName')
      .populate('approvedBy', 'fullName')
      .exec();
  }

  async findByResident(residentId: string): Promise<Visit[]> {
    return this.visitModel
      .find({ resident: residentId })
      .populate('familyMember', 'name email')
      .populate('approvedBy', 'fullName')
      .exec();
  }

  async findByStatus(status: VisitStatus): Promise<Visit[]> {
    return this.visitModel
      .find({ status })
      .populate('resident', 'fullName')
      .populate('familyMember', 'name email')
      .populate('approvedBy', 'fullName')
      .exec();
  }

  async findOne(id: string): Promise<Visit> {
    const visit = await this.visitModel
      .findById(id)
      .populate('resident', 'fullName')
      .populate('familyMember', 'name email')
      .populate('approvedBy', 'fullName')
      .exec();
    
    if (!visit) {
      throw new NotFoundException(`Visit with ID "${id}" not found`);
    }
    return visit;
  }

  async update(id: string, updateVisitDto: UpdateVisitDto, familyMemberId: string): Promise<Visit> {
    const visit = await this.visitModel.findById(id);
    if (!visit) {
      throw new NotFoundException(`Visit with ID "${id}" not found`);
    }

    // Only allow family member to update their own visits and only if pending
    if (visit.familyMember.toString() !== familyMemberId) {
      throw new ForbiddenException('You can only update your own visits');
    }

    if (visit.status !== VisitStatus.PENDING) {
      throw new BadRequestException('Can only update pending visits');
    }

    const updatedVisit = await this.visitModel
      .findByIdAndUpdate(id, updateVisitDto, { new: true })
      .populate('resident', 'fullName')
      .populate('familyMember', 'name email')
      .exec();

    if (!updatedVisit) {
      throw new NotFoundException(`Visit with ID "${id}" not found`);
    }
    return updatedVisit;
  }

  async approveOrReject(id: string, approvalDto: VisitApprovalDto, staffUserId: string): Promise<Visit> {
    const visit = await this.visitModel.findById(id);
    if (!visit) {
      throw new NotFoundException(`Visit with ID "${id}" not found`);
    }

    if (visit.status !== VisitStatus.PENDING) {
      throw new BadRequestException('Can only approve/reject pending visits');
    }

    const updateData = {
      status: approvalDto.status,
      staffNotes: approvalDto.staffNotes,
      approvedBy: staffUserId,
      approvedAt: new Date(),
    };

    const updatedVisit = await this.visitModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .populate('resident', 'fullName')
      .populate('familyMember', 'name email')
      .populate('approvedBy', 'fullName')
      .exec();

    if (!updatedVisit) {
      throw new NotFoundException(`Visit with ID "${id}" not found`);
    }
    return updatedVisit;
  }

  async cancel(id: string, familyMemberId: string): Promise<Visit> {
    const visit = await this.visitModel.findById(id);
    if (!visit) {
      throw new NotFoundException(`Visit with ID "${id}" not found`);
    }

    if (visit.familyMember.toString() !== familyMemberId) {
      throw new ForbiddenException('You can only cancel your own visits');
    }

    if (![VisitStatus.PENDING, VisitStatus.APPROVED].includes(visit.status)) {
      throw new BadRequestException('Can only cancel pending or approved visits');
    }

    const updatedVisit = await this.visitModel
      .findByIdAndUpdate(id, { status: VisitStatus.CANCELLED }, { new: true })
      .populate('resident', 'fullName')
      .populate('familyMember', 'name email')
      .exec();

    if (!updatedVisit) {
      throw new NotFoundException(`Visit with ID "${id}" not found`);
    }
    return updatedVisit;
  }

  async markAsCompleted(id: string): Promise<Visit> {
    const visit = await this.visitModel.findById(id);
    if (!visit) {
      throw new NotFoundException(`Visit with ID "${id}" not found`);
    }

    if (visit.status !== VisitStatus.APPROVED) {
      throw new BadRequestException('Can only mark approved visits as completed');
    }

    const updatedVisit = await this.visitModel
      .findByIdAndUpdate(
        id, 
        { 
          status: VisitStatus.COMPLETED,
          actualEndTime: new Date(),
        }, 
        { new: true }
      )
      .populate('resident', 'fullName')
      .populate('familyMember', 'name email')
      .exec();

    if (!updatedVisit) {
      throw new NotFoundException(`Visit with ID "${id}" not found`);
    }
    return updatedVisit;
  }
} 