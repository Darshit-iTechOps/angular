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
}
