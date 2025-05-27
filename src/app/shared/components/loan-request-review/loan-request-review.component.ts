import { Component, Input, Output, EventEmitter,TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoanRequestApprovalDTO } from 'src/app/core/models/loan-request-approval.dto';
import { ReviewActionButtonComponent } from '../../../shared/components/review-action-buttons/review-action-button.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-loan-request-review',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ReviewActionButtonComponent],
  templateUrl: './loan-request-review.component.html',
})
export class LoanRequestReviewComponent {
  @Input() loanRequest!: LoanRequestApprovalDTO;
  @ViewChild('ktpModal') ktpModal?: TemplateRef<any>;
  @Input() isLoading = true;
  @Input() isSubmitting = false;
  @Input() role!: 'MARKETING' | 'BM' | 'BACKOFFICE';
  @Output() reviewSubmitted = new EventEmitter<{   
    status: string;
    notes: string;
    notesIdentitas: string;
    notesPlafond: string;
    notesSummary: string; 
  }>();
  ktpPhotoUrl: string = '';
  step: 'IDENTITAS' | 'PLAFOND' | 'SUMMARY' = 'IDENTITAS';
  stepOrder: string[] = ['IDENTITAS', 'PLAFOND', 'SUMMARY'];

  @Input() actions: {
    label: string;
    nextStatus: string;
    styleClass?: string;
  }[] = [];

  reviewForm: FormGroup;

  constructor(private fb: FormBuilder, private modalService: NgbModal) {
    this.reviewForm = this.fb.group({
      notesIdentitas: [''],
      notesPlafond: [''],
      notesSummary: [''],
      notes: [''],
    });
  }

  openModal(photoUrl: string): void {
    this.ktpPhotoUrl = photoUrl;
    this.modalService.open(this.ktpModal, { size: 'lg' });
  }

  goToNextStep() {
    if (this.step === 'IDENTITAS') this.step = 'PLAFOND';
    else if (this.step === 'PLAFOND') this.step = 'SUMMARY';
  }

  goToPreviousStep() {
    if (this.step === 'SUMMARY') this.step = 'PLAFOND';
    else if (this.step === 'PLAFOND') this.step = 'IDENTITAS';
  }

  submitReview(status: string) {
    if (this.reviewForm.invalid) return;

    const formValues = this.reviewForm.value;

    this.reviewSubmitted.emit({
      status,
      notes: formValues.notes,
      notesIdentitas: formValues.notesIdentitas,
      notesPlafond: formValues.notesPlafond,
      notesSummary: formValues.notesSummary
    });
  }
}
