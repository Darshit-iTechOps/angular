import { LoginState } from '@models/login.model';
import { createReducer, on } from '@ngrx/store';
import * as LoginActions from '@actions/login.action';

export const initialState: LoginState = {
  isLoading: false,
  response: null,
  error: '',
};

export const loginReducer = createReducer(
  initialState,
  on(LoginActions.loginResponseSuccess, (state: any, action: any) => ({
    ...state,
    isLoading: false,
    response: action.response,
  })),
  on(LoginActions.loginResponseFailure, (state: any, action: any) => ({
    ...state,
    isLoading: false,
    error: action.error,
  }))
);
