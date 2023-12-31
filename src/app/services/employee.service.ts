import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { httpOptions } from '@helpers/HeaderHelper.helper';
import { Observable } from 'rxjs';
import { Employee } from '@models/employee.model';
@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private url: string = 'Employees';
  constructor(private http: HttpClient) {}

  public EmployeesResponse(): Observable<Employee[]> {
    const url = `${environment.apiUrl}/${this.url}`;
    return this.http.get<Employee[]>(url);
  }

  public EmployeeResponse(id: number): Observable<Employee[]> {
    const url = `${environment.apiUrl}/${this.url}/${id}`;
    return this.http.get<Employee[]>(url);
  }

  public EmployeeRequest(id: number, employee: Employee): Observable<Employee> {
    const url = `${environment.apiUrl}/${this.url}/${id}`;
    return this.http.post<Employee>(url, employee, httpOptions);
  }

  public UpdateEmployeeStatus(id: number): Observable<Employee> {
    const url = `${environment.apiUrl}/${this.url}/${id}`;
    return this.http.put<Employee>(url, httpOptions);
  }

  public DeleteRequest(id: number): Observable<any> {
    const url = `${environment.apiUrl}/${this.url}/${id}`;
    return this.http.delete<any>(url);
  }
}
