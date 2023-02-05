import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import * as RoleActions from '@actions/roles.action';
import { Observable, map } from 'rxjs';
import { AppState } from '../../../../app.state';
import { select } from '@ngrx/store';
import {
  errorSelector,
  isLoadingSelector,
  rolesSelector,
} from '@selectors/roles.selector';
import { Role } from '@models/roles.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-hr-roles',
  templateUrl: './hr-roles.component.html',
  styleUrls: ['./hr-roles.component.scss'],
})
export class HrRolesComponent implements OnInit, AfterViewInit {
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  roles$: Observable<Role[]> = this.store.pipe(select(rolesSelector));
  displayedColumns: string[] = ['roleID', 'name', 'action'];

  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: any = MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private store: Store<AppState>) {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.roles$ = this.store.pipe(select(rolesSelector));
  }
  ngOnInit(): void {
    this.store.dispatch(RoleActions.getRoles());
    this.roles$.subscribe({ next: (role) => (this.dataSource.data = role) });
  }
}
