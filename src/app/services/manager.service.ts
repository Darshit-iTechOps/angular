import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { Manager } from '@models/manager.model';
@Injectable({
  providedIn: 'root',
})
export class ManagerService {
  private url: string = 'Employees/managers';
  constructor(private http: HttpClient) {}

  public ManagersResponse(): Observable<Manager[]> {
    const url = `${environment.apiUrl}/${this.url}`;
    return this.http.get<Manager[]>(url);
  }
}
