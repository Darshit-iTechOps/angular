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

export const addEmployee = createAction(
  '[Role] Add Employee',
  (empId: number, employee: Employee) => ({ empId, employee })
);

export const editEmployee = createAction(
  '[Employee] Edit Employee',
  (empId: number, employee: Employee) => ({ empId, employee })
);

export const addEmployeeSuccess = createAction(
  '[Employee] Add Employee Success',
  (employee: Employee) => ({ employee })
);

export const editEmployeeSuccess = createAction(
  '[Employee] Edit Employee Success',
  (employee: Employee) => ({ employee })
);

export const updateEmployeeStatus = createAction(
  '[Employee] Update Employee Status',
  (empId: number) => ({ empId })
);

export const updateEmployeeStatusSuccess = createAction(
  '[Employee] Update Employee Status Success',
  (employee: Employee) => ({ employee })
);

export const addEditEmployeeFailure = createAction(
  '[Employee] Get Employee Response Fail',
  (error: string) => ({ error })
);

export const deleteEmployee = createAction(
  '[Employee] Delete employee',
  (empId: number) => ({ empId })
);

export const deleteEmployeeSuccess = createAction(
  '[Employee] Delete employee Success',
  (empId: number) => ({ empId })
);
