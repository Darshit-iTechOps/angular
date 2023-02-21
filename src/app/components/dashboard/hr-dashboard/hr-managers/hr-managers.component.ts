import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Manager } from '@models/manager.model';
import * as ManagerAction from '@actions/manager.action';
import { AppState } from 'src/app/app.state';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  isManagerLoadingSelector,
  managersSelector,
} from '@selectors/manager.selector';
import { MatTableDataSource } from '@angular/material/table';
import { PaginatorComponent } from '@global/components/paginator/paginator.component';
import { MatSort } from '@angular/material/sort';
import { FilterComponent } from '@global/components/filter/filter.component';
import { errorEmployeeSelector } from '@selectors/employee.selector';

@Component({
  selector: 'app-hr-managers',
  templateUrl: './hr-managers.component.html',
  styleUrls: ['./hr-managers.component.scss'],
})
export class HrManagersComponent implements OnInit, AfterViewInit {
  managers$: Observable<Manager[]> = this.store.pipe(select(managersSelector));
  isManagerLoading$: Observable<boolean> = this.store.pipe(
    select(isManagerLoadingSelector)
  );
  error$: Observable<string | null> = this.store.pipe(
    select(errorEmployeeSelector)
  );
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = [
    'managerId',
    'empId',
    'fullName',
    'email',
    'telNo',
    'department',
    'status',
  ];

  constructor(private store: Store<AppState>) {}

  @ViewChild(PaginatorComponent) paginator: PaginatorComponent =
    new PaginatorComponent();
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(FilterComponent) filter = new FilterComponent();

  ngOnInit(): void {
    this.store.dispatch(ManagerAction.getManagers());
  }

  ngAfterViewInit(): void {
    this.managers$.subscribe({
      next: (managers) => (this.dataSource.data = managers),
    });
    this.dataSource.paginator = this.paginator.paginator;
    this.dataSource.sort = this.sort;
    this.filter.dataSource = this.dataSource;
  }
}
