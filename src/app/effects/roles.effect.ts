import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as RoleActions from '@actions/roles.action';
import {
  EMPTY,
  catchError,
  concatMap,
  exhaustMap,
  map,
  mergeMap,
  of,
} from 'rxjs';
import { RoleService } from '@services/role.service';

@Injectable()
export class RolesEffect {
  constructor(private action$: Actions, private service: RoleService) {}

  getRoles$ = createEffect(() =>
    this.action$.pipe(
      ofType(RoleActions.getRoles),
      exhaustMap(() => {
        return this.service.RolesResponse().pipe(
          map((roles) => RoleActions.getRolesSuccess(roles)),
          catchError((error) =>
            of(RoleActions.getRolesFailure({ error: error.message }))
          )
        );
      })
    )
  );

  addRole$ = createEffect(() =>
    this.action$.pipe(
      ofType(RoleActions.addRole),
      concatMap(({ role }) => {
        return this.service.RoleRequest(role).pipe(
          map((data) => RoleActions.addRoleSuccess(data)),
          catchError((error) =>
            of(RoleActions.addEditRoleFailure({ error: error.message }))
          )
        );
      })
    )
  );

  editRole$ = createEffect(() =>
    this.action$.pipe(
      ofType(RoleActions.editRole),
      concatMap(({ role }) => {
        return this.service.RoleRequest(role).pipe(
          map((data) => RoleActions.editRoleSuccess(data)),
          catchError((error) =>
            of(RoleActions.addEditRoleFailure({ error: error.message }))
          )
        );
      })
    )
  );

  deleteRole$ = createEffect(() =>
    this.action$.pipe(
      ofType(RoleActions.deleteRole),
      mergeMap(({ roleID }) => {
        return this.service.DeleteRequest(roleID).pipe(
          map(() => RoleActions.deleteRoleSuccess(roleID)),
          catchError((error) =>
            of(RoleActions.addEditRoleFailure({ error: error.message }))
          )
        );
      })
    )
  );
}
