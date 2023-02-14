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
  })),
  on(EmployeeActions.addEmployee, (state: any) => ({
    ...state,
    isLoading: true,
  })),
  on(EmployeeActions.editEmployee, (state: any) => ({
    ...state,
    isLoading: true,
  })),
  on(EmployeeActions.addEmployeeSuccess, (state: any, { employee }) => ({
    ...state,
    employees: [...state.employees, employee],
    isLoading: false,
  })),
  on(EmployeeActions.editEmployeeSuccess, (state: any, { employee }) => {
    const updatedEmployees = state.employees.map((e: any) => {
      return employee.empId === e.empId ? employee : e;
    });
    return {
      ...state,
      employees: updatedEmployees,
      isLoading: false,
    };
  }),
  on(EmployeeActions.addEditEmployeeFailure, (state: any, { error }) => ({
    ...state,
    isLoading: false,
    error: error,
  })),
  on(EmployeeActions.deleteEmployee, (state: any) => ({
    ...state,
    isLoading: true,
  })),
  on(EmployeeActions.deleteEmployeeSuccess, (state: any, { empId }) => {
    const updatedEmployees = state.employees.filter((e: any) => {
      return e.empId !== empId;
    });
    return {
      ...state,
      isLoading: false,
      employees: updatedEmployees,
    };
  })
);
