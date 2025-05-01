import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RoleService } from '../../../core/services/role.service';
import { FeatureService } from '../../../core/services/feature.service';
import { ToastrService } from 'ngx-toastr';
import { StringUtils } from '../../../core/utils/string-utils';
import { FeatureWithDisplayName } from '../../../core/models/feature-with-display-name.dto';
import { Feature } from '../../../core/models/feature-request.dto';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-role-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-role.component.html'
})
export class AddRoleComponent implements OnInit {
  roleName: string = '';
  // allFeatures: FeatureWithDisplayName[] = [];
  groupedFeatures: Record<string, FeatureWithDisplayName[]> = {};
  selectedFeatureIds: string[] = [];
  stringUtils = StringUtils;
  isLoading = false; // Mengganti isSubmitting menjadi isLoading
  objectKeys = Object.keys;

  constructor(
    private roleService: RoleService,
    private featureService: FeatureService,
    private toastr: ToastrService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadFeatures();
  }

  async loadFeatures(): Promise<void> {
    try {
      const grouped: Record<string, Feature[]> = await firstValueFrom(this.featureService.getAllGroupedFeatures());
      console.log('Grouped Features:', grouped);
      const transformed: Record<string, FeatureWithDisplayName[]> = {};

      Object.entries(grouped).forEach(([category, features]) => {
        transformed[category] = features.map(feature => ({
          ...feature,
          displayName: StringUtils.formatFeatureName(feature.name)
        }));
      });

      this.groupedFeatures = transformed;

    } catch (error: any) {
      this.toastr.error(error.error?.message || 'Gagal memuat fitur');
    }
  }

  onFeatureChange(event: any, featureId: string): void {
    if (event.target.checked) {
      this.selectedFeatureIds.push(featureId);
    } else {
      this.selectedFeatureIds = this.selectedFeatureIds.filter(id => id !== featureId);
    }
  }

  async onSubmit(): Promise<void> {
    if (!this.roleName.trim()) {
      this.toastr.warning('Nama role tidak boleh kosong');
      return;
    }

    this.isLoading = true; // Mengubah status menjadi loading

    try {
      // Normalisasi nama role
      const normalizedRoleName = StringUtils.normalizeRoleName(this.roleName, false);

      // Langkah pertama: buat role
      const createdRole = await firstValueFrom(this.roleService.createRole({ name: normalizedRoleName }));

      if (!createdRole?.id) {
        throw new Error('Role ID tidak ditemukan');
      }

      // Langkah kedua: assign fitur ke role
      await firstValueFrom(this.roleService.addRoleWithFeatures(createdRole.id, this.selectedFeatureIds));

      this.toastr.success('Role berhasil dibuat dan fitur ditambahkan');
      this.router.navigate(['/roles']);

    } catch (error: any) {
      console.error('Error:', error);
      this.toastr.error(error.error?.message || error.message || 'Terjadi kesalahan');

    } finally {
      this.isLoading = false; // Mengubah status kembali ke false setelah selesai
    }
  }
}
