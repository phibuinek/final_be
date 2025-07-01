import { CanActivate, ExecutionContext } from '@nestjs/common';
import { FamilyMembersService } from '../family-members.service';
export declare class FamilyAccessGuard implements CanActivate {
    private readonly familyMembersService;
    constructor(familyMembersService: FamilyMembersService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
