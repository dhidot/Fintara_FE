import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleService } from '../../../core/services/role.service';
import { FeatureService } from '../../../core/services/feature.service';
import { ToastrService } from 'ngx-toastr';
import { Feature } from '../../../core/models/feature-request.dto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StringUtils } from '../../../core/utils/string-utils';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  imports: [CommonModule, FormsModule],
})
export class EditRoleComponent implements OnInit {
  roleId: string = '';
  roleName: string = '';
  allFeatures: Feature[] = [];
  selectedFeatureIds: string[] = [];
  stringUtils = StringUtils;

  constructor(
    private roleService: RoleService,
    private featureService: FeatureService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}


  ngOnInit(): void {
    this.roleId = this.route.snapshot.paramMap.get('id') || '';
    this.loadAllFeatures(); // Muat semua fitur saat komponen dimulai
    this.loadRoleData(); // Muat data role berdasarkan roleId
  }

  loadRoleData(): void {
    // Ambil data fitur yang dimiliki role berdasarkan roleId
    this.roleService.getFeaturesByRole(this.roleId).subscribe({
      next: (features) => {
        // Menandai fitur yang dimiliki role dan menandai yang tercentang
        this.selectedFeatureIds = features.map(feature => feature.id);
      },
      error: () => this.toastr.error('Gagal memuat fitur untuk role ini.')
    });

    // Ambil nama role dari backend
    this.roleService.getRoleById(this.roleId).subscribe({
      next: (role) => {
        this.roleName = StringUtils.formatRoleName(role.name); // Mengisi nama role
      },
      error: () => this.toastr.error('Gagal memuat data role.')
    });
  }

  loadAllFeatures(): void {
    // Ambil semua fitur yang tersedia
    this.featureService.getAllFeatures().subscribe({
      next: (features) => {
        console.log('All Features:', features); // Periksa fitur yang diterima
        this.allFeatures = features;
      },
      error: () => this.toastr.error('Gagal memuat fitur.')
    });
  }

  onFeatureChange(event: Event, featureId: string): void {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      // Jika dicentang, tambahkan fitur ke selectedFeatureIds
      this.selectedFeatureIds.push(featureId);
    } else {
      // Jika tidak dicentang, hapus fitur dari selectedFeatureIds
      const index = this.selectedFeatureIds.indexOf(featureId);
      if (index !== -1) {
        this.selectedFeatureIds.splice(index, 1);
      }
    }
  }

  onSubmit(): void {
    // Kirim data role dan fitur yang dipilih ke backend
    this.roleService.updateRole(this.roleId, { name: StringUtils.normalizeRoleName(this.roleName), featureIds: this.selectedFeatureIds })
      .subscribe({
        next: () => {
          this.toastr.success('Role berhasil diperbarui');
          this.router.navigate(['/roles']);
        },
        error: (err) => {
          // Tampilkan pesan error yang lebih detail
          console.error('Error:', err);
          this.toastr.error('Gagal memperbarui role: ' + (err.error?.message || 'Internal Server Error'));
        }
      });
  }
}
