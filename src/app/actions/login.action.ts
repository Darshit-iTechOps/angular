import { Login, LoginResponse } from '@models/login.model';
import { createAction } from '@ngrx/store';

export const loginRequest = createAction(
  '[Login] Get Login Request',
  (login: Login) => ({ login })
);
export const loginResponseSuccess = createAction(
  '[LoginResponse] Get Login Response Success',
  (response: LoginResponse) => ({ response })
);
export const loginResponseFailure = createAction(
  '[LoginResponse] Get Login Response Fail',
  (error: string) => ({ error })
);
