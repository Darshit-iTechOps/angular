import { Injectable } from '@angular/core';
import { createEffect } from '@ngrx/effects';
import { Actions, ofType } from '@ngrx/effects';
import * as RoleActions from '@actions/roles.action';
import { catchError, map, mergeMap, of } from 'rxjs';
import { RoleService } from '@services/role.service';

@Injectable()
export class RolesEffect {
  constructor(private action$: Actions, private service: RoleService) {}

  getRoles$ = createEffect(() =>
    this.action$.pipe(
      ofType(RoleActions.getRoles),
      mergeMap(() => {
        return this.service.RolesResponse().pipe(
          map((roles) => RoleActions.getRolesSuccess({ roles })),
          catchError((error) =>
            of(RoleActions.getRolesFailure({ error: error.message }))
          )
        );
      })
    )
  );
}
