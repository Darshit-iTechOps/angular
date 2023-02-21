import { AppState } from '../app.state';
import { createSelector } from '@ngrx/store';

export const selectFeature = (state: AppState) => state.departments;

export const isDepartmentLoadingSelector = createSelector(
  selectFeature,
  (state) => state.isLoading
);
export const departmentsSelector = createSelector(
  selectFeature,
  (state) => state.departments
);
export const errorDepartmentSelector = createSelector(
  selectFeature,
  (state) => state.error
);
