import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as DepartmentActions from '@actions/department.action';
import {
  EMPTY,
  catchError,
  concatMap,
  exhaustMap,
  map,
  mergeMap,
  of,
} from 'rxjs';
import { DepartmentService } from '@services/department.service';

@Injectable()
export class DepartmentEffect {
  constructor(private action$: Actions, private service: DepartmentService) {}

  getDepartments$ = createEffect(() =>
    this.action$.pipe(
      ofType(DepartmentActions.getDepartments),
      exhaustMap(() => {
        return this.service.DepartmentsResponse().pipe(
          map((departments) =>
            DepartmentActions.getDepartmentsSuccess(departments)
          ),
          catchError((error) =>
            of(DepartmentActions.getDepartmentsFailure(error.message))
          )
        );
      })
    )
  );

  addDepartment$ = createEffect(() =>
    this.action$.pipe(
      ofType(DepartmentActions.addDepartment),
      concatMap(({ deptId, department }) => {
        return this.service.DepartmentRequest(deptId, department).pipe(
          map((department) =>
            DepartmentActions.addDepartmentSuccess(department)
          ),
          catchError((error) =>
            of(DepartmentActions.getDepartmentsFailure(error.message))
          )
        );
      })
    )
  );

  editDepartment$ = createEffect(() =>
    this.action$.pipe(
      ofType(DepartmentActions.editDepartment),
      concatMap(({ deptId, department }) => {
        return this.service.DepartmentRequest(deptId, department).pipe(
          map((department) =>
            DepartmentActions.editDepartmentSuccess(department)
          ),
          catchError((error) =>
            of(DepartmentActions.getDepartmentsFailure(error.message))
          )
        );
      })
    )
  );

  updateDepartmentStatus$ = createEffect(() =>
    this.action$.pipe(
      ofType(DepartmentActions.updateDepartmentStatus),
      concatMap(({ deptId }) => {
        return this.service.UpdateDepartmentStatus(deptId).pipe(
          map((department) =>
            DepartmentActions.updateDepartmentStatusSuccess(department)
          ),
          catchError((error) =>
            of(DepartmentActions.getDepartmentsFailure(error.message))
          )
        );
      })
    )
  );
}
