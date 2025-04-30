import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class UpdateDepartmentInput {
  @Field(() => ID)
  @IsNotEmpty()
  id: number;

  @Field()
  @IsNotEmpty()
  @MinLength(2, { message: 'Department name must be at least 2 characters long' })
  name: string;
}