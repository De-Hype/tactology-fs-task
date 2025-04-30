"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const department_entity_1 = require("./entities/department.entity");
const sub_department_entity_1 = require("./entities/sub-department.entity");
let DepartmentsService = class DepartmentsService {
    departmentsRepository;
    subDepartmentsRepository;
    constructor(departmentsRepository, subDepartmentsRepository) {
        this.departmentsRepository = departmentsRepository;
        this.subDepartmentsRepository = subDepartmentsRepository;
    }
    async create(createDepartmentInput) {
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
        }
        else {
            savedDepartment.subDepartments = [];
        }
        return savedDepartment;
    }
    async findAll(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        return this.departmentsRepository.find({
            relations: ['subDepartments'],
            skip,
            take: limit,
        });
    }
    async findOne(id) {
        const department = await this.departmentsRepository.findOne({
            where: { id },
            relations: ['subDepartments'],
        });
        if (!department) {
            throw new common_1.NotFoundException(`Department with ID ${id} not found`);
        }
        return department;
    }
    async update(updateDepartmentInput) {
        const department = await this.findOne(updateDepartmentInput.id);
        department.name = updateDepartmentInput.name;
        return this.departmentsRepository.save(department);
    }
    async remove(id) {
        const department = await this.findOne(id);
        const result = await this.departmentsRepository.remove(department);
        return !!result;
    }
};
exports.DepartmentsService = DepartmentsService;
exports.DepartmentsService = DepartmentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(department_entity_1.Department)),
    __param(1, (0, typeorm_1.InjectRepository)(sub_department_entity_1.SubDepartment)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], DepartmentsService);
//# sourceMappingURL=departments.service.js.map