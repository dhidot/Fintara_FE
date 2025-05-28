export interface LoanApprovalDTO {
  id: string;
  handledById: string;
  handledByName: string;
  handledByRole: 'MARKETING' | 'BM' | 'BACKOFFICE' | string;
  status: string;
  notesIdentitas: string;
  notesPlafond: string;
  notesSummary: string;
  approvedAt: string; // biasanya string ISO date
}

