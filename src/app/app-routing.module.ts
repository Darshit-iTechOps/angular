import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth/auth.guard';
import { LoginComponent } from '@components/login/login.component';
import { RegisterComponent } from '@components/register/register.component';
import { DashboardComponent } from '@components/dashboard/dashboard.component';
import { HrRolesComponent } from '@components/dashboard/hr-dashboard/hr-roles/hr-roles.component';
import { HrManagersComponent } from '@components/dashboard/hr-dashboard/hr-managers/hr-managers.component';
import { HrEmployeesComponent } from '@components/dashboard/hr-dashboard/hr-employees/hr-employees.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'hr/roles', component: HrRolesComponent },
      { path: 'hr/managers', component: HrManagersComponent },
      { path: 'hr/employees', component: HrEmployeesComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

export const routedComponents = [
  LoginComponent,
  RegisterComponent,
  DashboardComponent,
  HrRolesComponent,
  HrManagersComponent,
];
