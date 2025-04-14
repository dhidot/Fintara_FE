// src/app/core/models/pegawai-details-request.dto.ts

export interface Role {
  name: string;
}

export interface PegawaiDetailsRequestDTO {
  nip: string;
  branchId: string;  // UUID untuk ID branch
  statusPegawai: string;
  role: Role | null;  // Role bisa null jika tidak diubah
}
