import { NgModule, CUSTOM_ELEMENTS_SCHEMA, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AngularMaterialModule } from './angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { roleReducer } from '@reducers/roles.reducer';

import { AppRoutingModule, routedComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from '@components/login/login.component';
import { RegisterComponent } from '@components/register/register.component';
import { DashboardComponent } from '@components/dashboard/dashboard.component';
import { LayoutComponent } from '@components/layout/layout.component';
import { EmployeeDashboardComponent } from '@components/dashboard/employee-dashboard/employee-dashboard.component';
import { HrDashboardComponent } from '@components/dashboard/hr-dashboard/hr-dashboard.component';
import { ManagerDashboardComponent } from '@components/dashboard/manager-dashboard/manager-dashboard.component';
import { HrRolesComponent } from '@components/dashboard/hr-dashboard/hr-roles/hr-roles.component';
import { HrManagersComponent } from '@components/dashboard/hr-dashboard/hr-managers/hr-managers.component';
// Services
import { RoleService } from '@services/role.service';
import { EmployeeService } from '@services/employee.service';
import { DepartmentService } from '@services/department.service';
import {
  ErrorStateMatcher,
  ShowOnDirtyErrorStateMatcher,
} from '@angular/material/core';
import { JWTInterceptor } from './interceptor/jwt.interceptor';
import { EffectsModule } from '@ngrx/effects';
import { RolesEffect } from '@effects/roles.effect';
import { loginReducer } from '@reducers/login.reducer';
import { LoginEffect } from '@effects/login.effect';
import { HrRoleFormComponent } from '@components/dashboard/hr-dashboard/forms/hr-role-form/hr-role-form.component';
import { HrEmployeesComponent } from './components/dashboard/hr-dashboard/hr-employees/hr-employees.component';
import { employeeReducer } from '@reducers/employee.reducer';
import { EmployeeEffect } from '@effects/employee.effect';
import { PaginatorComponent } from './global/components/paginator/paginator.component';
import { HrEmployeeFormComponent } from './components/dashboard/hr-dashboard/forms/hr-employee-form/hr-employee-form.component';

@NgModule({
  declarations: [
    AppComponent,
    routedComponents,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    LayoutComponent,
    EmployeeDashboardComponent,
    HrDashboardComponent,
    ManagerDashboardComponent,
    HrRolesComponent,
    HrManagersComponent,
    HrRoleFormComponent,
    HrEmployeesComponent,
    PaginatorComponent,
    HrEmployeeFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    EffectsModule.forRoot({}),
    StoreModule.forRoot({
      roles: roleReducer,
      login: loginReducer,
      employee: employeeReducer,
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
    }),
    EffectsModule.forFeature([LoginEffect, RolesEffect, EmployeeEffect]),
  ],
  providers: [
    RoleService,
    EmployeeService,
    DepartmentService,
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
    { provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
