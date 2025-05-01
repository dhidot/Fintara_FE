export interface LoanApprovalHistory {
  id: string;
  customerName: string;
  amount: number;
  tenor: number;
  statusName: string;
  requestDate: string;
  marketingHandledDate?: string;
  branchManagerHandledDate?: string;
  backOfficeHandledDate?: string;
}
