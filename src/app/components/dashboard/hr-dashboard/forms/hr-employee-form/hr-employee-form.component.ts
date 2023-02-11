import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '@hooks/MyErrorStateMatcher.hook';
import { Employee } from '@models/employee.model';
import { Role } from '@models/roles.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-hr-employee-form',
  templateUrl: './hr-employee-form.component.html',
  styleUrls: ['./hr-employee-form.component.scss'],
})
export class HrEmployeeFormComponent implements AfterViewInit {
  @Input() title: string = '';
  @Input() employee = {} as Employee;
  @Input() roles: Observable<Role[]> = new Observable<Role[]>();
  @Output() dataEvent = new EventEmitter<Employee>();
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  matcher = new MyErrorStateMatcher();
  selectionControl = new FormControl('', [Validators.required]);

  constructor() {}

  ngAfterViewInit() {
    console.log(this.roles);
  }

  saveEmployee() {
    this.dataEvent.emit(this.employee);
  }
  handleChange(): void {
    // this.error$;
  }
}
