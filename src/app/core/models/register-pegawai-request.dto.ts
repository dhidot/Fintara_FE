// src/app/core/models/register-pegawai-request.model.ts
export interface RegisterPegawaiRequest {
  name: string;
  email: string;
  role: string;
  nip: string;
  branchName: string;
  statusPegawai: 'ACTIVE' | 'CDT' | 'CUTI' | 'RESIGN'; // atau sesuai enum dari backend
}
