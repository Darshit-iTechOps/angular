import { AppState } from '../app.state';
import { createSelector } from '@ngrx/store';

export const selectFeature = (state: AppState) => state.login;
export const isLoadingSelector = createSelector(
  selectFeature,
  (state) => state.isLoading
);
export const errorSelector = createSelector(
  selectFeature,
  (state) => state.error
);
export const loginSelector = createSelector(
  selectFeature,
  (state) => state.response
);
