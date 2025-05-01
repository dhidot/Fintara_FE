import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { MenuItemComponent } from '../menu-item/menu-item.component';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, DropdownComponent, MenuItemComponent],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translateX(0)',  /* Sidebar dalam posisi normal */
      })),
      state('out', style({
        transform: 'translateX(-100%)',  /* Sidebar menghilang ke kiri */
      })),
      transition('in <=> out', [
        animate('300ms ease-in-out')  /* Durasi animasi */
      ])
    ])
  ]
})
export class SidebarComponent {
  @Input() visible: boolean = true;
  dropdowns = {
    bm: false,
    backOffice: false,
    marketing: false
  };


  toggleDropdown(key: 'bm' | 'backOffice' | 'marketing') {
  this.dropdowns[key] = !this.dropdowns[key];
  }

  get stateName() {
    return this.visible ? 'in' : 'out';
  }

  hasFeature(feature: string): boolean {
    const features = JSON.parse(localStorage.getItem('features') || '[]');
    return features.includes(feature);
  }

  getDashboardLink(): string | null {
    if (this.hasFeature('FEATURE_SUPER_ADMIN_DASHBOARD_ACCESS')) {
      return '/dashboard/super-admin';
    } else if (this.hasFeature('FEATURE_BACK_OFFICE_DASHBOARD_ACCESS')) {
      return '/dashboard/back-office';
    } else if (this.hasFeature('FEATURE_BRANCH_MANAGER_DASHBOARD_ACCESS')) {
      return '/dashboard/branch-manager';
    } else if (this.hasFeature('FEATURE_MARKETING_DASHBOARD_ACCESS')) {
      return '/dashboard/marketing';
    } else {
      return null;
    }
  }
}
