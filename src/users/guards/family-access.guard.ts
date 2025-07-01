import { Injectable, CanActivate, ExecutionContext, ForbiddenException, BadRequestException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { FamilyMembersService } from '../family-members.service';
import { Role } from '../../common/enums/role.enum';

@Injectable()
export class FamilyAccessGuard implements CanActivate {
  constructor(private readonly familyMembersService: FamilyMembersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // If user is not authenticated or has no roles, deny access
    if (!user || !user.roles) {
      return false;
    }

    // Admin and Staff have unrestricted access
    if (user.roles.includes(Role.Admin) || user.roles.includes(Role.Staff)) {
      return true;
    }

    // For FamilyMember, check if they are linked to the resident
    if (user.roles.includes(Role.FamilyMember)) {
      const residentId = request.params.residentId || request.params.id;

      if (!residentId) {
        // This guard should only be used on routes with :residentId or :id param
        throw new BadRequestException('Resident ID is missing in the request parameters.');
      }
      
      try {
        const familyMemberProfile = await this.familyMembersService.findByUser(user.userId);
        
        const isLinked = familyMemberProfile.residents.some(
          (linkedResidentId) => linkedResidentId.toString() === residentId,
        );

        if (isLinked) {
          return true;
        }
      } catch (error) {
        // If findByUser throws an error (e.g., profile not found), deny access
        throw new ForbiddenException('You do not have access to this resident\'s information.');
      }

      throw new ForbiddenException('You do not have access to this resident\'s information.');
    }

    // Deny access by default
    return false;
  }
} 