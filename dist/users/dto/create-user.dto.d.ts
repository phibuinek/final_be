import { Role } from '../../common/enums/role.enum';
export declare class CreateUserDto {
    username: string;
    email: string;
    password: string;
    fullName: string;
    roles?: Role[];
    phoneNumber?: string;
    address?: string;
}
