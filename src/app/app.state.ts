import { DepartmentState } from '@models/department.model';
import { EmployeeState } from '@models/employee.model';
import { LoginState } from '@models/login.model';
import { ManagerState } from '@models/manager.model';
import { RoleState } from '@models/roles.model';

export interface AppState {
  readonly roles: RoleState;
  readonly login: LoginState;
  readonly employees: EmployeeState;
  readonly managers: ManagerState;
  readonly departments: DepartmentState;
}
