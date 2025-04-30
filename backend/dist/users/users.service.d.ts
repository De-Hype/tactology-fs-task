import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    findById(id: number): Promise<User>;
    findByUsername(username: string): Promise<User | null>;
    createUser(username: string, email: string, password: string): Promise<User>;
}
