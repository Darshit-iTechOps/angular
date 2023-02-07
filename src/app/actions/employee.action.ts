import { createAction } from '@ngrx/store';
import { Employee } from '@models/employee.model';

export const getEmployees = createAction('[Employee] Get Employees');

export const getEmployeesSuccess = createAction(
  '[Employee] Get Employees Success',
  (employees: Employee[]) => ({ employees })
);

export const getEmployeesFailure = createAction(
  '[Employee] Get Employees Failure',
  (error: string) => ({ error })
);
