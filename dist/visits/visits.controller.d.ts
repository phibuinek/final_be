import { VisitsService } from './visits.service';
import { CreateVisitDto } from './dto/create-visit.dto';
import { UpdateVisitDto } from './dto/update-visit.dto';
import { VisitApprovalDto } from './dto/visit-approval.dto';
import { VisitStatus } from './schemas/visit.schema';
export declare class VisitsController {
    private readonly visitsService;
    constructor(visitsService: VisitsService);
    create(createVisitDto: CreateVisitDto, req: any): Promise<import("./schemas/visit.schema").Visit>;
    findAll(status?: VisitStatus, residentId?: string): Promise<import("./schemas/visit.schema").Visit[]>;
    getMyVisits(req: any): Promise<import("./schemas/visit.schema").Visit[]>;
    getPendingVisits(): Promise<import("./schemas/visit.schema").Visit[]>;
    findOne(id: string): Promise<import("./schemas/visit.schema").Visit>;
    update(id: string, updateVisitDto: UpdateVisitDto, req: any): Promise<import("./schemas/visit.schema").Visit>;
    approveOrReject(id: string, approvalDto: VisitApprovalDto, req: any): Promise<import("./schemas/visit.schema").Visit>;
    cancel(id: string, req: any): Promise<import("./schemas/visit.schema").Visit>;
    markAsCompleted(id: string): Promise<import("./schemas/visit.schema").Visit>;
}
