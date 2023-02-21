import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as ManagerActions from '@actions/manager.action';
import { EMPTY, catchError, exhaustMap, map, of } from 'rxjs';
import { ManagerService } from '@services/manager.service';

@Injectable()
export class ManagerEffect {
  constructor(private action$: Actions, private service: ManagerService) {}

  getManagers$ = createEffect(() =>
    this.action$.pipe(
      ofType(ManagerActions.getManagers),
      exhaustMap(() => {
        return this.service.ManagersResponse().pipe(
          map((managers) => ManagerActions.getManagersSuccess(managers)),
          catchError((error) =>
            of(ManagerActions.getManagersFailure(error.message))
          )
        );
      })
    )
  );
}
