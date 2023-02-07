import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '@hooks/MyErrorStateMatcher.hook';
import { Login } from '@models/login.model';
import { AppState } from '../../../app/app.state';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { errorSelector, isLoadingSelector } from '@selectors/login.selector';
import * as LoginActions from '@actions/login.action';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  login: Login = new Login();
  matcher = new MyErrorStateMatcher();
  isLoading$: Observable<boolean> = this.store.pipe(select(isLoadingSelector));
  error$: Observable<string> = this.store.pipe(select(errorSelector));

  constructor(private store: Store<AppState>) {}

  authLogin(): void {
    this.store.dispatch(LoginActions.loginRequest(this.login));
  }

  handleChange(): void {
    // this.error$;
  }
}
