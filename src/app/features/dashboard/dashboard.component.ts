import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="p-4"><h2>Selamat datang di Dashboard!</h2></div>`,
})
export class DashboardComponent {}
