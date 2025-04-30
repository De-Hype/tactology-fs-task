import { DepartmentsService } from './departments.service';
import { CreateDepartmentInput } from './dto/create-department.input';
import { UpdateDepartmentInput } from './dto/update-department.input';
import { Department } from './entities/department.entity';
export declare class DepartmentsResolver {
    private readonly departmentsService;
    constructor(departmentsService: DepartmentsService);
    createDepartment(createDepartmentInput: CreateDepartmentInput): Promise<Department>;
    findAll(page: number, limit: number): Promise<Department[]>;
    findOne(id: number): Promise<Department>;
    updateDepartment(updateDepartmentInput: UpdateDepartmentInput): Promise<Department>;
    removeDepartment(id: number): Promise<boolean>;
}
