import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import * as LoginActions from '@actions/login.action';
import { LoginService } from '@services/login.service';
import { StorageHelper } from '@helpers/StorageHelper.helper';
import { Router } from '@angular/router';
import { LoginResponse } from '@models/login.model';

@Injectable()
export class LoginEffect {
  storageHelper: StorageHelper = new StorageHelper();

  constructor(
    private action$: Actions,
    private service: LoginService,
    private router: Router
  ) {}

  prepareRedirect(response: LoginResponse): void {
    if (Object.keys(response).length > 0) {
      this.storageHelper.SetToken(response.token);
      this.storageHelper.SetID(response.user.empId);
      this.storageHelper.SetRole(response.user.role.name);
      this.storageHelper.SetLoggedIn(true);
      this.router.navigate(['/dashboard'], {
        queryParams: { user: response.user.empId },
      });
    }
  }

  loginRequest$ = createEffect(() =>
    this.action$.pipe(
      ofType(LoginActions.loginRequest),
      mergeMap((action) => {
        return this.service.LoginRequest(action.login).pipe(
          map((response) => LoginActions.loginResponseSuccess({ response })),
          catchError((error) =>
            of(LoginActions.loginResponseFailure({ error: error.message }))
          )
        );
      })
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(LoginActions.loginResponseSuccess),
        tap(({ response }) => {
          this.prepareRedirect(response);
        })
      ),
    { dispatch: false }
  );
}
