import { AppState } from '../app.state';
import { createSelector } from '@ngrx/store';

export const selectFeature = (state: AppState) => state.roles;
export const isLoadingSelector = createSelector(
  selectFeature,
  (state) => state.isLoading
);
export const rolesSelector = createSelector(
  selectFeature,
  (state) => state.roles
);
export const errorSelector = createSelector(
  selectFeature,
  (state) => state.error
);
