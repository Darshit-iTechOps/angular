import { AppState } from '../app.state';
import { createSelector } from '@ngrx/store';

export const selectFeature = (state: AppState) => state.employeeState;
export const isEmployeeLoadingSelector = createSelector(
  selectFeature,
  (state) => state.isLoading
);
export const employeesSelector = createSelector(
  selectFeature,
  (state) => state.employees
);
export const errorEmployeeSelector = createSelector(
  selectFeature,
  (state) => state.error
);
