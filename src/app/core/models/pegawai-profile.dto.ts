export interface PegawaiProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  pegawaiDetails?: {
    id: string;
    nip: string;
    jenisKelamin: 'LAKI_LAKI' | 'PEREMPUAN'; // sesuaikan enum-nya
    branchName: string;
    statusPegawai: 'ACTIVE' | 'CUTI' | 'RESIGN' | 'CDT'; // sesuaikan enum-nya
  };
}
