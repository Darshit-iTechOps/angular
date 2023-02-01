import { Role } from '@models/roles';
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

export type LoginResponse = {
  token: string;
  user: User;
};
