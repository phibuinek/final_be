import { VisitStatus } from '../schemas/visit.schema';
export declare class VisitApprovalDto {
    status: VisitStatus.APPROVED | VisitStatus.REJECTED;
    staffNotes?: string;
}
