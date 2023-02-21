import { OnInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Manager } from '@models/manager.model';
import { Department } from '@models/department.model';
@Component({
  selector: 'app-hr-department-form',
  templateUrl: './hr-department-form.component.html',
  styleUrls: ['./hr-department-form.component.scss'],
})
export class HrDepartmentFormComponent implements OnInit {
  @Input() managers: Observable<Manager[]> = new Observable<Manager[]>();
  @Input() title: string = '';
  @Input() department = {} as Department;
  @Input() editData!: Department;
  @Output() dataEvent = new EventEmitter<Department>();

  departmentForm!: FormGroup;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.departmentForm = this.formBuilder.group({
      deptId: [''],
      name: ['', Validators.required],
      managerId: ['', Validators.required],
      status: ['', Validators.required],
    });

    if (this.editData) {
      this.departmentForm.controls['deptId'].setValue(
        this.editData.deptId ?? 0
      );
      this.departmentForm.controls['name'].setValue(this.editData.name);
      this.departmentForm.controls['managerId'].setValue(
        this.editData.managerId ?? 0
      );
      this.departmentForm.controls['status'].setValue(this.editData.status);
    }
  }

  saveDepartment() {
    this.department = this.departmentForm.value;
    this.dataEvent.emit(this.department);
    this.departmentForm.reset();
  }
}
