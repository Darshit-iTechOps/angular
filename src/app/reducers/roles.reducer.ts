import { RoleState } from '@models/roles.model';
import { createReducer, on } from '@ngrx/store';
import * as RolesActions from '@actions/roles.action';

export const initialState: RoleState = {
  isLoading: false,
  roles: [],
  error: null,
};

export const roleReducer = createReducer(
  initialState,
  on(RolesActions.getRoles, (state: any) => ({ ...state, isLoading: true })),
  on(RolesActions.getRolesSuccess, (state: any, action: any) => ({
    ...state,
    isLoading: false,
    roles: action.roles,
  })),
  on(RolesActions.getRolesFailure, (state: any, action: any) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
  on(RolesActions.getRole, (state: any) => ({ ...state, isLoading: true })),
  on(RolesActions.addEditRole, (state: any) => ({ ...state, isLoading: true }))
);
