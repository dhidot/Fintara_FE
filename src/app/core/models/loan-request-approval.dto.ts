export interface LoanRequestApprovalDTO {
  id: string;
  customerJob: string;
  customerSalary: number;
  amount: number;
  tenor: number;
  status: string; //  // Properti baru untuk menyimpan nama status
  requestDate: string;

  customerName: string;
  customerKtpPhotoUrl: string;
  customerSelfieKtpPhotoUrl: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;

  // tambahkan ini:
  marketingNotes?: string;
  bmNotes?: string;
  backofficeNotes?: string;
}
