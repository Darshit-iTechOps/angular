export class Roles {
  roleID: number = 0;
  name = '';
}

export type Role = {
  roleID: number;
  name: string;
};

export interface RoleState {
  isLoading: boolean;
  roles: Role[];
  error: string | null;
}
