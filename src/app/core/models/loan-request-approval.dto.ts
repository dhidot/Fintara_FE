export interface LoanRequestApprovalDTO {
  id: string;
  amount: number;
  tenor: number;
  status: string; //  // Properti baru untuk menyimpan nama status
  requestDate: string;

  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerJob: string;
  customerSalary: number;

  // tambahkan ini:
  marketingNotes?: string;
  bmNotes?: string;
}
