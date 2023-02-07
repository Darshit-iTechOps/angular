import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { httpOptions } from '@helpers/HeaderHelper.helper';
import { Observable } from 'rxjs';
import { Roles, Role } from '@models/roles.model';
@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private url: string = 'Roles';
  constructor(private http: HttpClient) {}

  public RolesResponse(): Observable<Role[]> {
    const url = `${environment.apiUrl}/${this.url}`;
    return this.http.get<Role[]>(url);
  }

  public RoleResponse(id: number): Observable<Role> {
    const url = `${environment.apiUrl}/${this.url}/${id}`;
    return this.http.get<Role>(url);
  }

  public RoleRequest(role: Roles): Observable<Role> {
    const url = `${environment.apiUrl}/${this.url}`;
    return this.http.post<Role>(url, role, httpOptions);
  }

  public DeleteRequest(id: number): Observable<any> {
    const url = `${environment.apiUrl}/${this.url}/${id}`;
    return this.http.delete<any>(url);
  }
}
