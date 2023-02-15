import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as EmployeeActions from '@actions/employee.action';
import {
  EMPTY,
  catchError,
  concatMap,
  exhaustMap,
  map,
  mergeMap,
  of,
} from 'rxjs';
import { EmployeeService } from '@services/employee.service';

@Injectable()
export class EmployeeEffect {
  constructor(private action$: Actions, private service: EmployeeService) {}

  getEmployees$ = createEffect(() =>
    this.action$.pipe(
      ofType(EmployeeActions.getEmployees),
      exhaustMap(() => {
        return this.service.EmployeesResponse().pipe(
          map((employees) => EmployeeActions.getEmployeesSuccess(employees)),
          catchError((error) =>
            of(EmployeeActions.getEmployeesFailure(error.message))
          )
        );
      })
    )
  );

  addEmployee$ = createEffect(() =>
    this.action$.pipe(
      ofType(EmployeeActions.addEmployee),
      concatMap(({ empId, employee }) => {
        return this.service.EmployeeRequest(empId, employee).pipe(
          map((employee) => EmployeeActions.addEmployeeSuccess(employee)),
          catchError((error) =>
            of(EmployeeActions.getEmployeesFailure(error.message))
          )
        );
      })
    )
  );

  editEmployee$ = createEffect(() =>
    this.action$.pipe(
      ofType(EmployeeActions.editEmployee),
      concatMap(({ empId, employee }) => {
        return this.service.EmployeeRequest(empId, employee).pipe(
          map((employee) => EmployeeActions.editEmployeeSuccess(employee)),
          catchError((error) =>
            of(EmployeeActions.getEmployeesFailure(error.message))
          )
        );
      })
    )
  );

  updateEmployeeStatus$ = createEffect(() =>
    this.action$.pipe(
      ofType(EmployeeActions.updateEmployeeStatus),
      concatMap(({ empId }) => {
        return this.service.UpdateEmployeeStatus(empId).pipe(
          map((employee) =>
            EmployeeActions.updateEmployeeStatusSuccess(employee)
          ),
          catchError((error) =>
            of(EmployeeActions.getEmployeesFailure(error.message))
          )
        );
      })
    )
  );

  deleteEmployee$ = createEffect(() =>
    this.action$.pipe(
      ofType(EmployeeActions.deleteEmployee),
      mergeMap(({ empId }) => {
        return this.service.DeleteRequest(empId).pipe(
          map(() => EmployeeActions.deleteEmployeeSuccess(empId)),
          catchError((error) =>
            of(EmployeeActions.getEmployeesFailure(error.message))
          )
        );
      })
    )
  );
}
