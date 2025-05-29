export interface LoanSimulationResponseDTO {
  requestedAmount: number;
  disbursedAmount: number;
  tenor: number;
  interestRate: number;
  interestAmount: number;
  feesAmount: number;
  totalRepayment: number;
  estimatedInstallment: number;
}
