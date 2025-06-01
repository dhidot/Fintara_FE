import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleService } from '../../../core/services/role.service';
import { FeatureService } from '../../../core/services/feature.service';
import { ToastrService } from 'ngx-toastr';
import { Feature } from '../../../core/models/feature-request.dto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StringUtils } from '../../../core/utils/string-utils';
import { firstValueFrom } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-role',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-role.component.html',
})
export class EditRoleComponent implements OnInit {
  roleId: string = '';
  roleName: string = '';
  allFeatures: Feature[] = [];
  categorizedFeatures: { [category: string]: Feature[] } = {};
  selectedFeatureIds: string[] = [];
  stringUtils = StringUtils;
  isLoading = false;
  objectKeys = Object.keys;

  constructor(
    private roleService: RoleService,
    private featureService: FeatureService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.roleId = this.route.snapshot.paramMap.get('id') || '';
    this.loadAllFeatures(); // Memuat semua fitur
    this.loadRoleData(); // Memuat data role yang sudah ada
  }

  async loadRoleData(): Promise<void> {
    try {
      // Mengambil fitur berdasarkan roleId
      const features = await firstValueFrom(this.roleService.getFeaturesByRole(this.roleId));
      this.selectedFeatureIds = features.map(feature => feature.id);

      // Mengambil data role berdasarkan roleId
      const role = await firstValueFrom(this.roleService.getRoleById(this.roleId));
      this.roleName = StringUtils.formatRoleName(role.name); // Format nama role
    } catch (error: any) {
      this.toastr.error(error.error?.message || 'Gagal memuat data role.');
    }
  }

  async loadAllFeatures(): Promise<void> {
    try {
      const categorized = await firstValueFrom(this.featureService.getAllGroupedFeatures());
      this.categorizedFeatures = categorized;
    } catch (error: any) {
      this.toastr.error(error.error?.message || 'Gagal memuat fitur.');
    }
  }

  onFeatureChange(event: Event, featureId: string): void {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      this.selectedFeatureIds.push(featureId);
    } else {
      const index = this.selectedFeatureIds.indexOf(featureId);
      if (index !== -1) {
        this.selectedFeatureIds.splice(index, 1);
      }
    }
  }

  async onSubmit(): Promise<void> {
    if (!this.roleName.trim()) {
      this.toastr.warning('Nama role tidak boleh kosong');
      return;
    }

    const result = await Swal.fire({
      title: 'Konfirmasi',
      text: 'Apakah Anda yakin ingin memperbarui role ini?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Ya, perbarui',
      cancelButtonText: 'Batal',
    });

    if (result.isConfirmed) {
      this.isLoading = true;

      try {
        const normalizedRoleName = StringUtils.normalizeRoleName(this.roleName, false);

        await firstValueFrom(this.roleService.updateRole(this.roleId, {
          name: normalizedRoleName,
          featureIds: this.selectedFeatureIds
        }));

        this.toastr.success('Role berhasil diperbarui');
        this.router.navigate(['/roles']);
      } catch (error: any) {
        console.error('Error:', error);
        this.toastr.error(error.error?.message || error.message || 'Terjadi kesalahan');
      } finally {
        this.isLoading = false;
      }
    }
  }
}
