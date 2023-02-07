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
  on(RolesActions.getRoles, (state: any) => ({
    ...state,
    isLoading: true,
  })),
  on(RolesActions.getRolesSuccess, (state: any, { roles }) => ({
    ...state,
    isLoading: false,
    roles: roles,
  })),
  on(RolesActions.getRolesFailure, (state: any, { error }) => ({
    ...state,
    isLoading: false,
    error: error,
  })),
  on(RolesActions.getRole, (state: any) => ({ ...state, isLoading: true })),
  on(RolesActions.addRole, (state: any) => ({
    ...state,
    isLoading: true,
  })),
  on(RolesActions.editRole, (state: any) => ({
    ...state,
    isLoading: true,
  })),
  on(RolesActions.addRoleSuccess, (state: any, { role }) => ({
    ...state,
    roles: [...state.roles, role],
    isLoading: false,
  })),
  on(RolesActions.editRoleSuccess, (state: any, { role }) => {
    const updatedRoles = state.roles.map((r: any) => {
      return role.roleID === r.roleID ? role : r;
    });
    return {
      ...state,
      roles: updatedRoles,
      isLoading: false,
    };
  }),
  on(RolesActions.addEditRoleFailure, (state: any, { error }) => ({
    ...state,
    isLoading: false,
    error: error,
  })),
  on(RolesActions.deleteRole, (state: any) => ({
    ...state,
    isLoading: true,
  })),
  on(RolesActions.deleteRoleSuccess, (state: any, { roleID }) => {
    const updatedRoles = state.roles.filter((role: any) => {
      return role.roleID !== roleID;
    });
    return {
      ...state,
      isLoading: false,
      roles: updatedRoles,
    };
  })
);
