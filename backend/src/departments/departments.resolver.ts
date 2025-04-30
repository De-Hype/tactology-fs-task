import { UseGuards } from '@nestjs/common';
import { Args, ID, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentInput } from './dto/create-department.input';
import { UpdateDepartmentInput } from './dto/update-department.input';
import { Department } from './entities/department.entity';

@Resolver(() => Department)
export class DepartmentsResolver {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Mutation(() => Department)
  @UseGuards(JwtAuthGuard)
  createDepartment(
    @Args('input') createDepartmentInput: CreateDepartmentInput,
  ): Promise<Department> {
    return this.departmentsService.create(createDepartmentInput);
  }

  @Query(() => [Department], { name: 'departments' })
  @UseGuards(JwtAuthGuard)
  async findAll(
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
    @Args('limit', { type: () => Int, defaultValue: 10 }) limit: number,
  ): Promise<Department[]> {
    return this.departmentsService.findAll(page, limit);
  }

  @Query(() => Department, { name: 'department' })
  @UseGuards(JwtAuthGuard)
  findOne(@Args('id', { type: () => ID }) id: number): Promise<Department> {
    return this.departmentsService.findOne(id);
  }

  @Mutation(() => Department)
  @UseGuards(JwtAuthGuard)
  updateDepartment(
    @Args('input') updateDepartmentInput: UpdateDepartmentInput,
  ): Promise<Department> {
    return this.departmentsService.update(updateDepartmentInput);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  removeDepartment(@Args('id', { type: () => ID }) id: number): Promise<boolean> {
    return this.departmentsService.remove(id);
  }
}