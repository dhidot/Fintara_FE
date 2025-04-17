import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { RouterModule, Router } from '@angular/router';
import { RoleService } from '../../../core/services/role.service';
import { ToastrService } from 'ngx-toastr';
import { StringUtils } from '../../../core/utils/string-utils';
import { LoadingComponent } from 'src/app/shared/components/loading/loading.component';
import { TableActionButtonsComponent } from 'src/app/shared/components/table-action-buttons/table-action-buttons.component';

@Component({
  selector: 'app-list-role',
  standalone: true,
  imports: [CommonModule, FormsModule,NgxDatatableModule, RouterModule, LoadingComponent, TableActionButtonsComponent],
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class ListRoleComponent implements OnInit {
  roles: any[] = [];
  filteredRoles: any[] = [];
  searchTerm: string = '';
  isLoading = true;
  stringUtils = StringUtils;

  constructor(private roleService: RoleService, private toastr: ToastrService, private router: Router) {}

  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles(): void {
    this.isLoading = true;
    this.roleService.getRolesWithFeatureCount().subscribe({
      next: (response) => {
        this.roles = response;
        this.filteredRoles = [...this.roles];
        this.isLoading = false;
      },
      error: () => {
        this.toastr.error('Gagal memuat data role.', 'Error');
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
    this.router.navigate(['/role/edit', role.id]);
  }
}
