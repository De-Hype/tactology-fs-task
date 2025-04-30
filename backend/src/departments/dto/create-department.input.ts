import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsNotEmpty, IsOptional, MinLength, ValidateNested } from 'class-validator';
import { CreateSubDepartmentInput } from './create-sub-department.input';

@InputType()
export class CreateDepartmentInput {
  @Field()
  @IsNotEmpty()
  @MinLength(2, { message: 'Department name must be at least 2 characters long' })
  name: string;

  @Field(() => [CreateSubDepartmentInput], { nullable: true })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSubDepartmentInput)
  subDepartments?: CreateSubDepartmentInput[];
}