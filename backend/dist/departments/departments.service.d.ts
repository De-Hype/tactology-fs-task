import { Repository } from 'typeorm';
import { Department } from './entities/department.entity';
import { SubDepartment } from './entities/sub-department.entity';
import { CreateDepartmentInput } from './dto/create-department.input';
import { UpdateDepartmentInput } from './dto/update-department.input';
export declare class DepartmentsService {
    private departmentsRepository;
    private subDepartmentsRepository;
    constructor(departmentsRepository: Repository<Department>, subDepartmentsRepository: Repository<SubDepartment>);
    create(createDepartmentInput: CreateDepartmentInput): Promise<Department>;
    findAll(page?: number, limit?: number): Promise<Department[]>;
    findOne(id: number): Promise<Department>;
    update(updateDepartmentInput: UpdateDepartmentInput): Promise<Department>;
    remove(id: number): Promise<boolean>;
}
