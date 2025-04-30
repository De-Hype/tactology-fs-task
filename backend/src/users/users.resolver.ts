import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  
  @Query(() => User)
  @UseGuards(JwtAuthGuard)
  async me(@CurrentUser() user: User) {
    return user;
  }

  @Query(() => User, { name: 'user' })
  @UseGuards(JwtAuthGuard)
  async findById(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findById(id);
  }
}