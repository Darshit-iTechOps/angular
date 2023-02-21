import { Employee } from '@models/employee.model';

export interface Manager {
  managerId: number;
  empId: number;
  employee: Employee;
}

export interface ManagerState {
  isLoading: boolean;
  managers: Manager[];
  error: string | null;
}
