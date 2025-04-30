import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponse } from './dto/login.response';
import { LoginInput } from './dto/login.input';
import { User } from 'src/users/entities/user.entity';
import { CreateUserInput } from 'src/users/dto/create-user.input';
import { UsersService } from 'src/users/users.service';

@Resolver()
export class AuthResolver {
    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService,
      ) {}

  @Mutation(() => User)
  async createUser(
    @Args('input') createUserInput: CreateUserInput,
  ): Promise<User> {
    const { username, email, password } = createUserInput;
    return this.usersService.createUser(username, email, password);
  }
  @Mutation(() => LoginResponse)
  async login(@Args('input') loginInput: LoginInput) {
    console.log(loginInput)
    return this.authService.login(loginInput);
  }
}
