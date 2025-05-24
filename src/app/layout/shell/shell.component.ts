import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { BreadcrumbClockCardComponent } from '../components/breadcrumb-clock-card/breadcrumb-clock-card.component';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent, NavbarComponent, BreadcrumbClockCardComponent],
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.css'],
  animations: [
    trigger('slideContent', [
      state('expanded', style({
        marginLeft: '0'
      })),
      state('collapsed', style({
        marginLeft: '260px'
      })),
      transition('expanded <=> collapsed', [
        animate('300ms ease-in-out')
      ])
    ])
  ]
})
export class ShellComponent {
  sidebarVisible = true;

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  get sidebarState() {
    return this.sidebarVisible ? 'collapsed' : 'expanded';
  }

  onSidebarToggled(): void {
    // Broadcast resize biar datatable refresh
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 200); // beri delay karena sidebar slide pakai animasi
  }
}
