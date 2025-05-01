import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { RouterModule, Router } from '@angular/router';
import { RoleService } from '../../../core/services/role.service';
import { StringUtils } from 'src/app/core/utils/string-utils';
import { ToastrService } from 'ngx-toastr';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { TableActionButtonsComponent } from 'src/app/shared/components/table-action-buttons/table-action-buttons.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-role',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NgxDatatableModule,
    RouterModule,
    LoadingComponent,
    TableActionButtonsComponent
  ],
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class ListRoleComponent implements OnInit {
  roles: any[] = [];
  filteredRoles: any[] = [];
  searchTerm = '';
  isLoading = false;
  stringUtils = StringUtils;

  constructor(
    private roleService: RoleService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles(): void {
    this.isLoading = true;

    this.roleService.getRolesWithFeatureCount().subscribe({
      next: (roles) => {
        this.roles = roles;
        this.filteredRoles = [...roles];
      },
      error: () => {
        // optional override jika ingin toast
        this.toastr.error('Gagal memuat data role.', 'Error');
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  filterRoles(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredRoles = this.roles.filter(role =>
      role.name.toLowerCase().includes(term)
    );
  }

  onEdit(role: any): void {
    this.router.navigate(['/roles/edit', role.id]);
  }

  onDelete(role: any): void {
    Swal.fire({
      title: `Apakah kamu yakin ingin menghapus role ${role.name}?`,
      showCancelButton: true,
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Batalkan',
      icon: 'warning'
    }).then((result) => {
      if (result.isConfirmed) {
        this.roleService.deleteRole(role.id).subscribe({
          next: (response) => { // <<-- tangkap response di sini
            Swal.fire('Deleted!', response.message, 'success'); // <<-- pakai response.message
            this.loadRoles();
          },
          error: () => {
            Swal.fire('Error', 'Gagal menghapus role.', 'error');
          }
        });
      }
    });
  }
}
