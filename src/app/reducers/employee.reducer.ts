import { EmployeeState } from '@models/employee.model';
import { createReducer, on } from '@ngrx/store';
import * as EmployeeActions from '@actions/employee.action';

export const initialState: EmployeeState = {
  isLoading: false,
  employees: [],
  error: null,
};

export const employeeReducer = createReducer(
  initialState,
  on(EmployeeActions.getEmployees, (state: any) => ({
    ...state,
    isLoading: true,
  })),
  on(EmployeeActions.getEmployeesSuccess, (state: any, { employees }) => ({
    ...state,
    isLoading: false,
    employees: employees,
  })),
  on(EmployeeActions.getEmployeesFailure, (state: any, { error }) => ({
    ...state,
    isLoading: false,
    error: error,
  }))
);
