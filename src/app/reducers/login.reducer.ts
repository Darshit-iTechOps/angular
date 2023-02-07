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
  on(LoginActions.loginRequest,(state:any)=>({
     ...state,
    isLoading: true,
  })),
  on(LoginActions.loginResponseSuccess, (state: any, { response }) => ({
    ...state,
    isLoading: false,
    response: response,
  })),
  on(LoginActions.loginResponseFailure, (state: any, { error }) => ({
    ...state,
    isLoading: false,
    error: error,
  }))
);
