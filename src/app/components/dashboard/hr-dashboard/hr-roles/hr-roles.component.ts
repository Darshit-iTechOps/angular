import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  TemplateRef,
} from '@angular/core';
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
import { Role, Roles } from '@models/roles.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-hr-roles',
  templateUrl: './hr-roles.component.html',
  styleUrls: ['./hr-roles.component.scss'],
})
export class HrRolesComponent implements OnInit, AfterViewInit {
  isLoading$: Observable<boolean> = this.store.pipe(select(isLoadingSelector));
  error$: Observable<string | null> = this.store.pipe(select(errorSelector));
  roles$: Observable<Role[]> = this.store.pipe(select(rolesSelector));
  displayedColumns: string[] = ['roleID', 'name', 'action'];
  isSelectedForUpdate: boolean = false;
  title: string = 'Add';
  role: Roles = new Roles();

  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild('modal', { static: true }) modal: any = TemplateRef;

  constructor(private store: Store<AppState>, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.store.dispatch(RoleActions.getRoles());
    this.roles$.subscribe({ next: (role) => (this.dataSource.data = role) });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  editRole(templateRef: TemplateRef<any>, role: Role): void {
    this.isSelectedForUpdate = true;
    this.openDialog(templateRef);
    this.role.roleID = role.roleID;
    this.role.name = role.name;
  }

  saveRole(): void {
    this.role.roleID === 0
      ? this.store.dispatch(RoleActions.addRole(this.role))
      : this.store.dispatch(RoleActions.editRole(this.role));
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
