import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanRequestReviewComponent } from './loan-request-review.component';

describe('LoanRequestReviewComponent', () => {
  let component: LoanRequestReviewComponent;
  let fixture: ComponentFixture<LoanRequestReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanRequestReviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanRequestReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
