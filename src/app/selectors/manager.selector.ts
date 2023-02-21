import { AppState } from '../app.state';
import { createSelector } from '@ngrx/store';

export const selectFeature = (state: AppState) => state.managers;

export const isManagerLoadingSelector = createSelector(
  selectFeature,
  (state) => state.isLoading
);
export const managersSelector = createSelector(
  selectFeature,
  (state) => state.managers
);
export const errorManagerSelector = createSelector(
  selectFeature,
  (state) => state.error
);
