import { User } from './entities/user.entity';
import { UsersService } from './users.service';
export declare class UsersResolver {
    private readonly usersService;
    constructor(usersService: UsersService);
    me(user: User): Promise<User>;
    findById(id: number): Promise<User>;
}
