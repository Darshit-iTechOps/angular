import { ManagerState } from '@models/manager.model';
import { createReducer, on } from '@ngrx/store';
import * as ManagerActions from '@actions/manager.action';

export const initialState: ManagerState = {
  isLoading: false,
  managers: [],
  error: null,
};

export const managerReducer = createReducer(
  initialState,
  on(ManagerActions.getManagers, (state: any) => ({
    ...state,
    isLoading: true,
  })),
  on(ManagerActions.getManagersSuccess, (state: any, { managers }) => ({
    ...state,
    isLoading: false,
    managers: managers,
  })),
  on(ManagerActions.getManagersFailure, (state: any, { error }) => ({
    ...state,
    isLoading: false,
    error: error,
  }))
);
