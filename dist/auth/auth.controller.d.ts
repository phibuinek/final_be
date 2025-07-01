import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto, req: any): Promise<{
        access_token: string;
        user: {
            _id: any;
            email: any;
            roles: any;
        };
    }>;
    register(registerDto: RegisterDto): Promise<import("../users/schemas/user.schema").User>;
}
