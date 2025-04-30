import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { User } from 'src/users/entities/user.entity';
import { CreateUserInput } from 'src/users/dto/create-user.input';
import { UsersService } from 'src/users/users.service';
export declare class AuthResolver {
    private readonly authService;
    private readonly usersService;
    constructor(authService: AuthService, usersService: UsersService);
    createUser(createUserInput: CreateUserInput): Promise<User>;
    login(loginInput: LoginInput): Promise<{
        accessToken: string;
        user: any;
    }>;
}
