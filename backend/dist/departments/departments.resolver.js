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
exports.DepartmentsResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const auth_guard_1 = require("../auth/guards/auth.guard");
const departments_service_1 = require("./departments.service");
const create_department_input_1 = require("./dto/create-department.input");
const update_department_input_1 = require("./dto/update-department.input");
const department_entity_1 = require("./entities/department.entity");
let DepartmentsResolver = class DepartmentsResolver {
    departmentsService;
    constructor(departmentsService) {
        this.departmentsService = departmentsService;
    }
    createDepartment(createDepartmentInput) {
        return this.departmentsService.create(createDepartmentInput);
    }
    async findAll(page, limit) {
        return this.departmentsService.findAll(page, limit);
    }
    findOne(id) {
        return this.departmentsService.findOne(id);
    }
    updateDepartment(updateDepartmentInput) {
        return this.departmentsService.update(updateDepartmentInput);
    }
    removeDepartment(id) {
        return this.departmentsService.remove(id);
    }
};
exports.DepartmentsResolver = DepartmentsResolver;
__decorate([
    (0, graphql_1.Mutation)(() => department_entity_1.Department),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_department_input_1.CreateDepartmentInput]),
    __metadata("design:returntype", Promise)
], DepartmentsResolver.prototype, "createDepartment", null);
__decorate([
    (0, graphql_1.Query)(() => [department_entity_1.Department], { name: 'departments' }),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard),
    __param(0, (0, graphql_1.Args)('page', { type: () => graphql_1.Int, defaultValue: 1 })),
    __param(1, (0, graphql_1.Args)('limit', { type: () => graphql_1.Int, defaultValue: 10 })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], DepartmentsResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => department_entity_1.Department, { name: 'department' }),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DepartmentsResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Mutation)(() => department_entity_1.Department),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_department_input_1.UpdateDepartmentInput]),
    __metadata("design:returntype", Promise)
], DepartmentsResolver.prototype, "updateDepartment", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DepartmentsResolver.prototype, "removeDepartment", null);
exports.DepartmentsResolver = DepartmentsResolver = __decorate([
    (0, graphql_1.Resolver)(() => department_entity_1.Department),
    __metadata("design:paramtypes", [departments_service_1.DepartmentsService])
], DepartmentsResolver);
//# sourceMappingURL=departments.resolver.js.map