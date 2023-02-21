import { OnInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MyErrorStateMatcher } from '@hooks/MyErrorStateMatcher.hook';
import { Department } from '@models/department.model';
import { Employee } from '@models/employee.model';
import { Manager } from '@models/manager.model';
import { Role } from '@models/roles.model';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-hr-employee-form',
  templateUrl: './hr-employee-form.component.html',
  styleUrls: ['./hr-employee-form.component.scss'],
})
export class HrEmployeeFormComponent implements OnInit {
  @Input() title: string = '';
  @Input() employee = {} as Employee;
  @Input() editData!: Employee;
  @Input() roles: Observable<Role[]> = new Observable<Role[]>();
  @Output() dataEvent = new EventEmitter<Employee>();
  @Input() managers: Observable<Manager[]> = new Observable<Manager[]>();
  @Input() departments: Observable<Department[]> = new Observable<
    Department[]
  >();

  matcher = new MyErrorStateMatcher();
  employeeForm!: FormGroup;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.employeeForm = this.formBuilder.group({
      empId: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      roleID: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telNo: ['', Validators.min(10)],
      password: ['', Validators.required],
      managerId: ['', Validators.required],
      deptId: ['', Validators.required],
      status: ['', Validators.required],
    });

    if (this.editData) {
      this.employeeForm.controls['empId'].setValue(this.editData.empId ?? 0);
      this.employeeForm.controls['firstName'].setValue(this.editData.firstName);
      this.employeeForm.controls['lastName'].setValue(this.editData.lastName);
      this.employeeForm.controls['roleID'].setValue(this.editData.roleID);
      this.employeeForm.controls['email'].setValue(this.editData.email);
      this.employeeForm.controls['telNo'].setValue(this.editData.telNo ?? '');
      this.employeeForm.controls['password'].setValue(this.editData.password);
      this.employeeForm.controls['managerId'].setValue(
        this.editData.managerId ?? 0
      );
      this.employeeForm.controls['deptId'].setValue(this.editData.deptId ?? 0);
      this.employeeForm.controls['status'].setValue(this.editData.status);
    }
  }

  saveEmployee() {
    this.employee = this.employeeForm.value;
    this.dataEvent.emit(this.employee);
    this.employeeForm.reset();
  }
}
