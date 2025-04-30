import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from './entities/department.entity';
import { SubDepartment } from './entities/sub-department.entity';
import { CreateDepartmentInput } from './dto/create-department.input';
import { UpdateDepartmentInput } from './dto/update-department.input';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private departmentsRepository: Repository<Department>,
    @InjectRepository(SubDepartment)
    private subDepartmentsRepository: Repository<SubDepartment>,
  ) {}

  async create(createDepartmentInput: CreateDepartmentInput): Promise<Department> {
    const department = this.departmentsRepository.create({
      name: createDepartmentInput.name,
    });
    
    const savedDepartment = await this.departmentsRepository.save(department);

    if (createDepartmentInput.subDepartments && createDepartmentInput.subDepartments.length > 0) {
      const subDepartments = createDepartmentInput.subDepartments.map((subDeptInput) => {
        return this.subDepartmentsRepository.create({
          name: subDeptInput.name,
          department: savedDepartment,
        });
      });
      
      await this.subDepartmentsRepository.save(subDepartments);
      
      savedDepartment.subDepartments = subDepartments;
    } else {
      savedDepartment.subDepartments = [];
    }

    return savedDepartment;
  }

  async findAll(page: number = 1, limit: number = 10): Promise<Department[]> {
    const skip = (page - 1) * limit;

    return this.departmentsRepository.find({
      relations: ['subDepartments'],
      skip,
      take: limit,
    });
  }

  async findOne(id: number): Promise<Department> {
    const department = await this.departmentsRepository.findOne({
      where: { id },
      relations: ['subDepartments'],
    });

    if (!department) {
      throw new NotFoundException(`Department with ID ${id} not found`);
    }

    return department;
  }

  async update(updateDepartmentInput: UpdateDepartmentInput): Promise<Department> {
    const department = await this.findOne(updateDepartmentInput.id);
    
    department.name = updateDepartmentInput.name;
    
    return this.departmentsRepository.save(department);
  }

  async remove(id: number): Promise<boolean> {
    const department = await this.findOne(id);
    
    const result = await this.departmentsRepository.remove(department);
    
    return !!result;
  }
}




 

