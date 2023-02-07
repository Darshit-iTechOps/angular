import { Role, Roles } from '@models/roles.model';
import { createAction, props } from '@ngrx/store';

export const getRoles = createAction('[Role] Get Roles');
export const getRolesSuccess = createAction(
  '[Role] Get Roles success',
  (roles: Role[]) => ({ roles })
);
export const getRolesFailure = createAction(
  '[Role] Get Roles failure',
  props<{ error: string }>()
);

export const getRole = createAction('[Role] Get Role');

export const addRole = createAction('[Role] Add  Role', (role: Roles) => ({
  role,
}));

export const editRole = createAction('[Role] Edit Role', (role: Roles) => ({
  role,
}));

export const addRoleSuccess = createAction(
  '[Role] Add  Role Success',
  (role: Role) => ({ role })
);

export const editRoleSuccess = createAction(
  '[Role]  Edit Role Success',
  (role: Role) => ({ role })
);

export const addEditRoleFailure = createAction(
  '[Role] Get Role Response Fail',
  props<{ error: string }>()
);

export const deleteRole = createAction(
  '[Role] Delete role',
  (roleID: number) => ({ roleID })
);

export const deleteRoleSuccess = createAction(
  '[Role] Delete role',
  (roleID: number) => ({ roleID })
);
