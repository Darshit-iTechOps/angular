import { Role } from '@models/roles.model';
import { Department } from '@models/department.model';
import { Manager } from '@models/manager.model';

export interface Employee {
  empId: number;
  firstName: string;
  lastName: string;
  roleID: number;
  role: Role;
  email: string;
  password: string;
  telNo: string | null;
  managerId: number | null;
  manager: Manager | null;
  deptId: number | null;
  department: Department | null;
  status: boolean;
}

export interface EmployeeState {
  isLoading: boolean;
  employees: Employee[];
  error: string | null;
}
