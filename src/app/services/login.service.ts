import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login, LoginResponse } from '@models/login.model';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { httpOptions } from '@helpers/HeaderHelper.helper';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private url = 'Login';
  constructor(private http: HttpClient) {}

  public LoginRequest(login: Login): Observable<LoginResponse> {
    const url = `${environment.apiUrl}/${this.url}`;
    return this.http.post<LoginResponse>(url, login, httpOptions);
  }
}
