interface LoanReviewHistoryDTO {
  reviewerName: string;
  role: 'MARKETING' | 'BM' | 'BACKOFFICE';
  step: 'IDENTITAS' | 'PLAFOND' | 'SUMMARY';
  notes: string;
  createdAt: string;
}
