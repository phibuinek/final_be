import { Model } from 'mongoose';
import { Visit, VisitStatus } from './schemas/visit.schema';
import { CreateVisitDto } from './dto/create-visit.dto';
import { UpdateVisitDto } from './dto/update-visit.dto';
import { VisitApprovalDto } from './dto/visit-approval.dto';
export declare class VisitsService {
    private visitModel;
    constructor(visitModel: Model<Visit>);
    create(createVisitDto: CreateVisitDto, familyMemberId: string): Promise<Visit>;
    findAll(): Promise<Visit[]>;
    findByFamilyMember(familyMemberId: string): Promise<Visit[]>;
    findByResident(residentId: string): Promise<Visit[]>;
    findByStatus(status: VisitStatus): Promise<Visit[]>;
    findOne(id: string): Promise<Visit>;
    update(id: string, updateVisitDto: UpdateVisitDto, familyMemberId: string): Promise<Visit>;
    approveOrReject(id: string, approvalDto: VisitApprovalDto, staffUserId: string): Promise<Visit>;
    cancel(id: string, familyMemberId: string): Promise<Visit>;
    markAsCompleted(id: string): Promise<Visit>;
}
