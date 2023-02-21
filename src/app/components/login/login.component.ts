import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
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
export class LoginComponent implements OnInit {
  login: Login = new Login();
  matcher = new MyErrorStateMatcher();
  isLoading$: Observable<boolean> = this.store.pipe(select(isLoadingSelector));
  error$: Observable<string> = this.store.pipe(select(errorSelector));

  loginForm!: FormGroup;

  constructor(
    private store: Store<AppState>,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  authLogin(): void {
    this.login = this.loginForm.value;
    this.store.dispatch(LoginActions.loginRequest(this.login));
  }

  handleChange(): void {
    // this.error$;
  }
}
