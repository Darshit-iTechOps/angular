import { Role } from '@models/roles.model';
import { createAction, props } from '@ngrx/store';

export const getRoles = createAction('[Role] Get Roles');
export const getRolesSuccess = createAction(
  '[Role] Get Roles success',
  props<{ roles: Role[] }>()
);
export const getRolesFailure = createAction(
  '[Role] Get Roles failure',
  props<{ error: string }>()
);

export const getRole = createAction('[Role] Get Role');
export const addEditRole = createAction('[Role] Add Edit Role');
