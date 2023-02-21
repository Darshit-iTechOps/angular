import { createAction } from '@ngrx/store';
import { Manager } from '@models/manager.model';

export const getManagers = createAction('[Manager] Get Managers');

export const getManagersSuccess = createAction(
  '[Manager] Get Managers Success',
  (managers: Manager[]) => ({ managers })
);

export const getManagersFailure = createAction(
  '[Manager] Get Managers Failure',
  (error: string) => ({ error })
);
