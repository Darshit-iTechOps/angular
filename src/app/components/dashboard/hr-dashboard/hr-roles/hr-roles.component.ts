import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as RoleActions from '@actions/roles.action';
import { Observable } from 'rxjs';
import { AppState } from '../../../../app.state';
import { select } from '@ngrx/store';
import {
  errorSelector,
  isLoadingSelector,
  rolesSelector,
} from '@selectors/roles.selector';
import { Role } from '@models/roles.model';

@Component({
  selector: 'app-hr-roles',
  templateUrl: './hr-roles.component.html',
  styleUrls: ['./hr-roles.component.scss'],
})
export class HrRolesComponent implements OnInit {
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  roles$: Observable<Role[]>;

  constructor(private store: Store<AppState>) {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.roles$ = this.store.pipe(select(rolesSelector));
  }
  ngOnInit(): void {
    this.store.dispatch(RoleActions.getRoles());
  }
}
