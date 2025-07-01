import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from './schemas/user.schema';
import { FamilyMember, FamilyMemberSchema } from './schemas/family-member.schema';
import { FamilyMembersService } from './family-members.service';
import { FamilyMembersController } from './family-members.controller';
import { FamilyAccessGuard } from './guards/family-access.guard';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: FamilyMember.name, schema: FamilyMemberSchema }
    ])
  ],
  controllers: [UsersController, FamilyMembersController],
  providers: [UsersService, FamilyMembersService, FamilyAccessGuard],
  exports: [UsersService, FamilyMembersService, FamilyAccessGuard],
})
export class UsersModule {} 