import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoanRequestApprovalDTO } from 'src/app/core/models/loan-request-approval.dto';

@Component({
  selector: 'app-loan-request-review',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './loan-request-review.component.html',
})
export class LoanRequestReviewComponent {
  @Input() loanRequest!: LoanRequestApprovalDTO;
  @Input() isLoading = true;
  @Input() isSubmitting = false;
  @Input() role!: 'MARKETING' | 'BM' | 'BACKOFFICE';
  @Output() reviewSubmitted = new EventEmitter<{ status: string; notes: string }>();

  @Input() actions: {
    label: string;
    nextStatus: string;
    styleClass?: string;
  }[] = [];

  reviewForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.reviewForm = this.fb.group({
      notes: [''],
    });
  }

  handleReview(status: string) {
    if (this.reviewForm.invalid) return;
    this.reviewSubmitted.emit({
      status,
      notes: this.reviewForm.value.notes,
    });
  }

  submitReview(status: string) {
    if (this.reviewForm.invalid) return;

    this.reviewSubmitted.emit({
      status,
      notes: this.reviewForm.value.notes,
    });
  }
}
