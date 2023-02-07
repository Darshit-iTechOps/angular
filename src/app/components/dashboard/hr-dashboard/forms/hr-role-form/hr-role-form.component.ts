import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Roles } from '@models/roles.model';

@Component({
  selector: 'app-hr-role-form',
  templateUrl: './hr-role-form.component.html',
  styleUrls: ['./hr-role-form.component.scss'],
})
export class HrRoleFormComponent {
  @Input() title: string = '';
  @Input() role: Roles = new Roles();
  @Output() dataEvent = new EventEmitter<Roles>();

  constructor() {}

  saveRole() {
    this.dataEvent.emit(this.role);
  }
}
