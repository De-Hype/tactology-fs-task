export interface SubDepartment {
    id: string;
    name: string;
  }
  
  export interface Department {
    id: string;
    name: string;
    subDepartments: SubDepartment[];
  }
  
  export interface CreateSubDepartmentInput {
    name: string;
  }
  
  export interface CreateDepartmentInput {
    name: string;
    subDepartments?: CreateSubDepartmentInput[] | null;
  }
  
  export interface UpdateDepartmentInput {
    id: string;
    name: string;
  }