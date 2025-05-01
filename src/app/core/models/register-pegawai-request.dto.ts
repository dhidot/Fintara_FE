import { JenisKelamin } from "../enums/jenis-kelamin";

// src/app/core/models/register-pegawai-request.model.ts
export interface RegisterPegawaiRequest {
  name: string;
  email: string;
  jenisKelamin: JenisKelamin; // sesuaikan enum-nya
  role: string;
  nip: string;
  branchName: string;
  statusPegawai: 'ACTIVE' | 'CDT' | 'CUTI' | 'RESIGN'; // atau sesuai enum dari backend
}
