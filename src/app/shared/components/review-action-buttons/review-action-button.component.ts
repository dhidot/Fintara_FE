import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-review-action-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      type="button"
      class="btn"
      [ngClass]="styleClass || 'btn-outline-secondary'"
      (click)="handleClick()"
      [disabled]="disabled"
    >
      <span *ngIf="loading" class="spinner-border spinner-border-sm me-1"></span>
      {{ label }}
    </button>
  `,
})
export class ReviewActionButtonComponent {
  @Input() label!: string;
  @Input() status!: string;
  @Input() styleClass: string = 'btn-primary';
  @Input() loading: boolean = false;
  @Input() disabled: boolean = false;
  @Input() confirmText!: string; // <-- tambahan input teks konfirmasi

  @Output() actionClick = new EventEmitter<string>();

  handleClick(): void {
    Swal.fire({
      title: 'Konfirmasi',
      text: this.confirmText,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Ya',
      cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        this.actionClick.emit(this.status);
      }
    });
  }
}
