// src/app/features/dashboard/summary-cards/summary-cards.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-summary-cards',
  templateUrl: './summary-cards.component.html',
  imports: [CommonModule, FormsModule],
})
export class SummaryCardsComponent {
  @Input() data: { [key: string]: number } = {};
  @Input() loading = false;
  @Input() error = '';
}
