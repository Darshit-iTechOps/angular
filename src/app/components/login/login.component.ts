import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MyErrorStateMatcher } from '@hooks/MyErrorStateMatcher';
import { Login, LoginResponse } from '@models/login';
import { LoginService } from '@services/login.service';
import { StorageHelper } from '@helpers/StorageHelper';

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

  storageHelper: StorageHelper = new StorageHelper();
  hasErrors: boolean = false;
  errors: string = '';

  constructor(private service: LoginService, private router: Router) {
    this.login = new Login();
  }

  authLogin(): void {
    this.service.LoginRequest(this.login).subscribe({
      next: (response) => this.prepareRedirect(response),
      error: (error) => {
        this.hasErrors = true;
        this.errors = error.error;
        this.login = new Login();
        this.storageHelper.ClearStorage();
      },
    });
  }

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

  handleChange(): void {
    this.hasErrors = false;
    this.errors = '';
  }
}
