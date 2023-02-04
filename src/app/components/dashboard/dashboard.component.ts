import { Component } from '@angular/core';
import { StorageHelper } from '@helpers/StorageHelper.helper';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  storageHelper: StorageHelper = new StorageHelper();
  role: string = '';
  activate_hr: boolean = false;
  activate_manager: boolean = false;
  activate_employee: boolean = false;

  routes: any = [];

  constructor() {
    this.role = this.storageHelper.GetRole();
    this.routeUser(this.role);
  }

  routeUser(role: string): void {
    switch (role.toLowerCase()) {
      case 'hr':
        this.activate_hr = true;
        this.routes = [
          {
            route: 'hr/roles',
            name: 'Roles',
          },
          {
            route: 'hr/managers',
            name: 'Managers',
          },
          {
            route: 'hr/employees',
            name: 'Employees',
          },
          {
            route: 'hr/departments',
            name: 'Departments',
          },
        ];
        break;
      case 'manager':
        this.activate_manager = true;
        this.routes = [
          {
            route: 'manager/roles',
            name: 'Roles',
          },
          {
            route: 'manager/employees',
            name: 'Employees',
          },
          {
            route: 'manager/departments',
            name: 'Departments',
          },
        ];
        break;
      case 'employee':
        this.activate_employee = true;
        this.routes = [
          {
            route: 'my/details',
            name: 'Profile',
          },
        ];
        break;
    }
  }
}
