import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table-action-buttons',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-action-buttons.component.html',
})
export class TableActionButtonsComponent {
  @Input() showEdit = true;
  @Input() showDelete = false;
  @Input() showDetail = false;

  @Output() editClicked = new EventEmitter<void>();
  @Output() deleteClicked = new EventEmitter<void>();
  @Output() detailClicked = new EventEmitter<void>();

  delete() {
    this.deleteClicked.emit();
  }
}

