import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../../app.state';
import {
  errorSelector,
  isRoleLoadingSelector,
  rolesSelector,
} from '@selectors/roles.selector';
import { Role, Roles } from '@models/roles.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { PaginatorComponent } from 'src/app/global/components/paginator/paginator.component';
import * as RoleActions from '@actions/roles.action';
import { MatSort } from '@angular/material/sort';
import { FilterComponent } from '@global/components/filter/filter.component';
@Component({
  selector: 'app-hr-roles',
  templateUrl: './hr-roles.component.html',
  styleUrls: ['./hr-roles.component.scss'],
})
export class HrRolesComponent implements OnInit, AfterViewInit {
  isLoading$: Observable<boolean> = this.store.pipe(
    select(isRoleLoadingSelector)
  );
  error$: Observable<string | null> = this.store.pipe(select(errorSelector));
  roles$: Observable<Role[]> = this.store.pipe(select(rolesSelector));
  displayedColumns: string[] = ['roleID', 'name', 'action'];
  isSelectedForUpdate: boolean = false;
  title: string = 'Add';
  role: Roles = new Roles();
  label: string = 'roles';
  dataSource = new MatTableDataSource();

  @ViewChild(PaginatorComponent) paginator: PaginatorComponent =
    new PaginatorComponent();
  @ViewChild('modal', { static: true }) modal: any = TemplateRef;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(FilterComponent) filter = new FilterComponent();

  constructor(private store: Store<AppState>, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.store.dispatch(RoleActions.getRoles());
    this.roles$.subscribe({ next: (role) => (this.dataSource.data = role) });
    this.paginator.label = this.label;
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator.paginator;
    this.dataSource.sort = this.sort;
    this.filter.dataSource = this.dataSource;
  }

  receiveData(role: Roles) {
    this.saveRole(role);
  }

  editRole(templateRef: TemplateRef<any>, role: Role): void {
    this.isSelectedForUpdate = true;
    this.openDialog(templateRef);
    this.role.roleID = role.roleID;
    this.role.name = role.name;
  }

  saveRole(role: Roles): void {
    role.roleID === 0
      ? this.store.dispatch(RoleActions.addRole(role))
      : this.store.dispatch(RoleActions.editRole(role));
    this.role = new Roles();
  }

  deleteRole(id: number): void {
    this.store.dispatch(RoleActions.deleteRole(id));
  }

  openDialog(templateRef: TemplateRef<any>) {
    this.role = new Roles();
    this.title = this.isSelectedForUpdate ? 'Edit' : 'Add';
    this.dialog.open(templateRef);
    this.isSelectedForUpdate = false;
  }
}
