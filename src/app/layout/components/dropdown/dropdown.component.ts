import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
})
export class DropdownComponent implements OnInit {
  @Input() label: string = '';
  @Input() items: { label: string; link: string }[] = [];
  @Input() isExpanded: boolean = false;
  @Output() toggle = new EventEmitter<void>();

  isActive: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.checkIfActive();
    this.router.events.subscribe(() => {
      this.checkIfActive();
    });
  }

  toggleDropdown() {
    this.toggle.emit();
  }

  checkIfActive(): void {
    const currentUrl = this.router.url;
    this.isActive = this.items.some(item =>
      currentUrl.startsWith(item.link.replace(/\/all$/, '')) // agar cocok juga ke /marketing/:id
    );
  }

  isItemActive(itemLink: string): boolean {
    const currentUrl = this.router.url;

    // aktif kalau:
    // - currentUrl persis sama
    // - currentUrl dimulai dengan /loan-request/... dan bukan /history
    return (
      currentUrl === itemLink ||
      (itemLink.includes('/all') && currentUrl.startsWith(itemLink.replace('/all', '')) && !currentUrl.includes('/history'))
    );
  }
}
