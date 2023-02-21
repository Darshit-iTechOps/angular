import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { httpOptions } from '@helpers/HeaderHelper.helper';
import { Observable } from 'rxjs';
import { Department } from '@models/department.model';
@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  private url: string = 'Departments';
  constructor(private http: HttpClient) {}

  public DepartmentsResponse(): Observable<Department[]> {
    const url = `${environment.apiUrl}/${this.url}`;
    return this.http.get<Department[]>(url);
  }

  public DepartmentResponse(id: number): Observable<Department[]> {
    const url = `${environment.apiUrl}/${this.url}/${id}`;
    return this.http.get<Department[]>(url);
  }

  public DepartmentRequest(
    id: number,
    department: Department
  ): Observable<Department> {
    const url = `${environment.apiUrl}/${this.url}/${id}`;
    return this.http.post<Department>(url, department, httpOptions);
  }

  public UpdateDepartmentStatus(id: number): Observable<Department> {
    const url = `${environment.apiUrl}/${this.url}/${id}`;
    return this.http.put<Department>(url, httpOptions);
  }
}
