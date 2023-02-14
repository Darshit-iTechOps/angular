import {
  AfterViewInit,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { PaginatorComponent } from 'src/app/global/components/paginator/paginator.component';
import { AppState } from '../../../../app.state';
import {
  employeesSelector,
  isEmployeeLoadingSelector,
  errorEmployeeSelector,
} from '@selectors/employee.selector';
import {
  errorSelector,
  isRoleLoadingSelector,
  rolesSelector,
} from '@selectors/roles.selector';
import { Role, Roles } from '@models/roles.model';
import * as RoleActions from '@actions/roles.action';
import * as EmployeeActions from '@actions/employee.action';
import { Employee } from '@models/employee.model';
@Component({
  selector: 'app-hr-employees',
  templateUrl: './hr-employees.component.html',
  styleUrls: ['./hr-employees.component.scss'],
})
export class HrEmployeesComponent implements OnInit, AfterViewInit {
  isRolesLoading$: Observable<boolean> = this.store.pipe(
    select(isRoleLoadingSelector)
  );
  roleError$: Observable<string | null> = this.store.pipe(
    select(errorSelector)
  );
  roles$: Observable<Role[]> = this.store.pipe(select(rolesSelector));
  isEmployeeLoading$: Observable<boolean> = this.store.pipe(
    select(isEmployeeLoadingSelector)
  );
  employeeError$: Observable<string | null> = this.store.pipe(
    select(errorEmployeeSelector)
  );
  employees$: Observable<Employee[]> = this.store.pipe(
    select(employeesSelector)
  );
  isSelectedForUpdate: boolean = false;
  title: string = 'Add';
  role: Roles = new Roles();
  employee = {} as Employee;
  label: string = 'Employees';
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = [
    'empId',
    'fullName',
    'role',
    'email',
    'telNo',
    'manager',
    'department',
    'status',
    'action',
  ];

  constructor(private store: Store<AppState>, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.store.dispatch(EmployeeActions.getEmployees());
    this.store.dispatch(RoleActions.getRoles());
    this.paginator.label = this.label;
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator.paginator;
    this.employees$.subscribe({
      next: (employees) => (this.dataSource.data = employees),
    });
  }

  @ViewChild(PaginatorComponent) paginator: PaginatorComponent =
    new PaginatorComponent();
  @ViewChild('modal', { static: true }) modal: any = TemplateRef;

  receiveData(employee: Employee) {
    this.saveEmployee(employee);
  }

  saveEmployee(employee: Employee): void {
    if (employee.empId == undefined) {
      employee.empId = 0;
    }
    if (employee.telNo == undefined) {
      employee.telNo = '000-000-0000';
    }
    employee.status = employee.status ? true : false;
    console.log(employee);
    employee.empId === 0
      ? this.store.dispatch(
          EmployeeActions.addEmployee(employee.empId, employee)
        )
      : this.store.dispatch(
          EmployeeActions.editEmployee(employee.empId, employee)
        );
    this.employee = {} as Employee;
  }

  editEmployee(templateRef: TemplateRef<any>, employee: Employee): void {
    this.isSelectedForUpdate = true;
    this.openDialog(templateRef);
    this.employee = employee;
  }

  deleteEmployee(id: number): void {
    this.store.dispatch(EmployeeActions.deleteEmployee(id));
  }

  openDialog(templateRef: TemplateRef<any>) {
    this.employee = {} as Employee;
    this.title = this.isSelectedForUpdate ? 'Edit' : 'Add';
    this.dialog.open(templateRef);
    this.isSelectedForUpdate = false;
  }
}
