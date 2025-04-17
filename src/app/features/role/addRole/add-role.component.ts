import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RoleService } from '../../../core/services/role.service';
import { FeatureService } from '../../../core/services/feature.service';
import { ToastrService } from 'ngx-toastr';
import { Feature } from '../../../core/models/feature-request.dto';
import { StringUtils } from '../../../core/utils/string-utils';

@Component({
  selector: 'app-role-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-role.component.html'
})
export class AddRoleComponent implements OnInit {
  roleName: string = '';
  allFeatures: any[] = [];
  selectedFeatureIds: string[] = [];
  stringUtils = StringUtils;

  constructor(
    private roleService: RoleService,
    private featureService: FeatureService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadFeatures();
  }

  loadFeatures(): void {
    this.featureService.getAllFeatures().subscribe({
      next: (features) => {
        // Menambahkan displayName secara dinamis
        this.allFeatures = features.map((feature: any) => ({
          ...feature,
          displayName: StringUtils.formatFeatureName(feature.name)
        }));
      },
      error: () => this.toastr.error('Gagal memuat fitur')
    });
  }

  onFeatureChange(event: any, featureId: string): void {
    if (event.target.checked) {
      this.selectedFeatureIds.push(featureId);
    } else {
      const index = this.selectedFeatureIds.indexOf(featureId);
      if (index !== -1) {
        this.selectedFeatureIds.splice(index, 1);
      }
    }
  }

  onSubmit(): void {
    if (!this.roleName.trim()) {
      this.toastr.warning('Nama role tidak boleh kosong');
      return;
    }
    // Langkah pertama: buat role
    this.roleService.createRole({ name: StringUtils.normalizeRoleName }).subscribe({
      next: (createdRole) => {
        // Role berhasil dibuat, sekarang ambil roleId
        const roleId = createdRole.id;

        // Langkah kedua: assign fitur ke role
        if (roleId) {
          this.roleService.addRoleWithFeatures(roleId, this.selectedFeatureIds).subscribe({
            next: (res) => {
              console.log('Assign feature response:', res);
              this.toastr.success('Role berhasil dibuat dan fitur ditambahkan');
              this.router.navigate(['/role']);
            },
            error: (err) => {
              console.error('Assign error:', err);
              this.toastr.error(err.error.message || 'Gagal assign fitur ke role');
            }
          });
        } else {
          this.toastr.error('Role ID tidak ditemukan');
        }
      },
      error: (err) => {
        this.toastr.error(err.error.message || 'Gagal membuat role');
      }
    });
  }
}
