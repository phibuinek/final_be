import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from '../common/enums/role.enum';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<import("./schemas/user.schema").User>;
    findAll(): Promise<import("./schemas/user.schema").User[]>;
    findOne(id: string): Promise<import("./schemas/user.schema").User>;
    updateRoles(id: string, updateRolesDto: {
        roles: Role[];
    }): Promise<import("./schemas/user.schema").User>;
    deactivateUser(id: string): Promise<import("./schemas/user.schema").User>;
}
