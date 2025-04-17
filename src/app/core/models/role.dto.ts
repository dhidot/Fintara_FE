export interface Role {
  id: string;  // ID unik untuk role
  name: string;  // Nama role
  description: string;  // Deskripsi role (opsional)
  featureIds: string[];  // Daftar ID fitur yang terkait dengan role
}
