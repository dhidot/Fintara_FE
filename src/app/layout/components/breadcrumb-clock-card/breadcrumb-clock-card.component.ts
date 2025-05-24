import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumb-clock-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './breadcrumb-clock-card.component.html',
  styleUrls: ['./breadcrumb-clock-card.component.css']
})
export class BreadcrumbClockCardComponent implements OnInit {
  currentPath = '';
  currentTime = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Update path on route change
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.currentPath = event.urlAfterRedirects;
    });

    // Update time every second
    setInterval(() => {
      const now = new Date();
      this.currentTime = now.toLocaleTimeString();
    }, 1000);
  }
}
