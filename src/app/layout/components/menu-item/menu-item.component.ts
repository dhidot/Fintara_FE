import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css'],
  imports: [RouterModule, FormsModule, CommonModule, ],
})
export class MenuItemComponent {
  @Input() label: string = '';
  @Input() icon: string = '';
  @Input() routerLink: string = '';
  @Input() feature: string = '';   // Fitur yang diperlukan untuk menampilkan item ini

  hasFeature(features: string[]): boolean {
    const availableFeatures = JSON.parse(localStorage.getItem('features') || '[]');
    return features.some(feature => availableFeatures.includes(feature));
  }
}
