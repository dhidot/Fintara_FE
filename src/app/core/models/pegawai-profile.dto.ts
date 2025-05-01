export interface PegawaiProfile {
  id: string;
  name: string;
  email: string;
  jenisKelamin: 'LAKI_LAKI' | 'PEREMPUAN'; // sesuaikan enum-nya
  role: string;
  pegawaiDetails?: {
    id: string;
    nip: string;
    branchName: string;
    statusPegawai: 'ACTIVE' | 'CUTI' | 'RESIGN' | 'CDT'; // sesuaikan enum-nya
  };
}
