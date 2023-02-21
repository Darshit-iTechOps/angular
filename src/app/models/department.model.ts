import { Manager } from './manager.model';

export interface Department {
  deptId: number;
  name: string;
  managerId: number | null;
  manager: null | Manager;
  status: boolean;
}

export interface DepartmentState {
  isLoading: boolean;
  departments: Department[];
  error: string | null;
}
