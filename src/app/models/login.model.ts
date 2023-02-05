import { Role } from '@models/roles.model';
export class Login {
  public Email: string = '';
  public Password: string = '';
}

export type User = {
  empId: number;
  firstName: string;
  lastName: string;
  telNo: string;
  email: string;
  role: Role;
  managerId: number;
  deptId: number;
  status: boolean;
};

export interface LoginState {
  isLoading: boolean;
  response: LoginResponse | null;
  error: string;
}

export type LoginResponse = {
  token: string;
  user: User;
};
