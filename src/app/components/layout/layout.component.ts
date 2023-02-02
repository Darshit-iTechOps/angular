import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { StorageHelper } from '@helpers/StorageHelper';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  @Input() role: string = '';
  storageHelper: StorageHelper = new StorageHelper();

  constructor(private router: Router) {}

  logout(): void {
    this.storageHelper.ClearStorage();
    this.router.navigate(['']);
  }
}
