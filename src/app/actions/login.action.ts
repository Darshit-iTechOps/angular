import { Login, LoginResponse } from '@models/login.model';
import { createAction, props } from '@ngrx/store';

export const loginRequest = createAction(
  '[Login] Get Login Request',
  props<{ login: Login }>()
);
export const loginResponseSuccess = createAction(
  '[LoginResponse] Get Login Response Success',
  props<{ response: LoginResponse }>()
);
export const loginResponseFailure = createAction(
  '[LoginResponse] Get Login Response Fail',
  props<{ error: string }>()
);
