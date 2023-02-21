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
import { FilterComponent } from '@global/components/filter/filter.component';
import { MatSort } from '@angular/material/sort';
import * as ManagerActions from '@actions/manager.action';
import * as DepartmentActions from '@actions/department.action';
import { Department } from '@models/department.model';
import {
  departmentsSelector,
  errorDepartmentSelector,
  isDepartmentLoadingSelector,
} from '@selectors/department.selector';
import {
  errorManagerSelector,
  isManagerLoadingSelector,
  managersSelector,
} from '@selectors/manager.selector';
import { Manager } from '@models/manager.model';

@Component({
  selector: 'app-hr-departments',
  templateUrl: './hr-departments.component.html',
  styleUrls: ['./hr-departments.component.scss'],
})
export class HrDepartmentsComponent implements OnInit, AfterViewInit {
  // Manager Section
  isManagerLoading$: Observable<boolean> = this.store.pipe(
    select(isManagerLoadingSelector)
  );
  managerError$: Observable<string | null> = this.store.pipe(
    select(errorManagerSelector)
  );
  managers$: Observable<Manager[]> = this.store.pipe(select(managersSelector));

  // Department Section
  isDepartmentLoading$: Observable<boolean> = this.store.pipe(
    select(isDepartmentLoadingSelector)
  );
  departmentError$: Observable<string | null> = this.store.pipe(
    select(errorDepartmentSelector)
  );
  departments$: Observable<Department[]> = this.store.pipe(
    select(departmentsSelector)
  );

  // Other variables
  department!: Department;
  isSelectedForUpdate: boolean = false;
  title: string = 'Add';
  label: string = 'Departments';
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = [
    'deptId',
    'name',
    'manager',
    'status',
    'action',
  ];

  constructor(private store: Store<AppState>, public dialog: MatDialog) {}

  @ViewChild(PaginatorComponent) paginator: PaginatorComponent =
    new PaginatorComponent();
  @ViewChild('modal', { static: true }) modal: any = TemplateRef;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(FilterComponent) filter = new FilterComponent();

  ngOnInit(): void {
    this.store.dispatch(DepartmentActions.getDepartments());
    this.store.dispatch(ManagerActions.getManagers());
    this.paginator.label = this.label;
  }
  ngAfterViewInit(): void {
    this.departments$.subscribe({
      next: (departments) => (this.dataSource.data = departments),
    });
    this.dataSource.paginator = this.paginator.paginator;
    this.dataSource.sort = this.sort;
    this.filter.dataSource = this.dataSource;
  }

  receiveData(department: Department) {
    this.saveDepartment(department);
  }

  saveDepartment(department: Department): void {
    department.deptId === 0
      ? this.store.dispatch(
          DepartmentActions.addDepartment(department.deptId, department)
        )
      : this.store.dispatch(
          DepartmentActions.editDepartment(department.deptId, department)
        );
    this.department = {} as Department;
  }

  editDepartment(templateRef: TemplateRef<any>, department: Department): void {
    this.isSelectedForUpdate = true;
    this.openDialog(templateRef);
    this.department = department;
  }

  changeStatus(id: number): void {
    this.store.dispatch(DepartmentActions.updateDepartmentStatus(id));
  }

  openDialog(templateRef: TemplateRef<any>) {
    this.department = {} as Department;
    this.title = this.isSelectedForUpdate ? 'Edit' : 'Add';
    this.dialog.open(templateRef);
    this.isSelectedForUpdate = false;
  }
}
