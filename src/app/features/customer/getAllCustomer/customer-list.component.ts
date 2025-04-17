import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CustomerService } from '../../../core/services/customer.service';
import { TableActionButtonsComponent } from 'src/app/shared/components/table-action-buttons/table-action-buttons.component'; // <- tambahkan ini jika nanti mau redirect

@Component({
  selector: 'app-list-customer',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxDatatableModule, TableActionButtonsComponent],
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class ListCustomerComponent implements OnInit {
  customerList: any[] = [];
  filteredCustomerList: any[] = [];
  isLoading = false;
  searchTerm = '';

  constructor(
    private customerService: CustomerService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCustomer();
  }

  loadCustomer(): void {
    this.isLoading = true;
    this.customerService.getAllCustomers().subscribe({
      next: (response) => {
        this.customerList = response.map((c: any) => ({
          ...c,
          nik: c.customerDetails?.nik ?? '-',
          statusPekerjaan: c.customerDetails?.statusPekerjaan ?? '-'
        }));
        this.filteredCustomerList = [...this.customerList];
      },
      error: () => {
        this.toastr.error('Gagal memuat data customer.', 'Error', {
          positionClass: 'toast-bottom-right',
          progressBar: true
        });
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  filterCustomer(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredCustomerList = this.customerList.filter((customer) =>
      customer.name.toLowerCase().includes(term) ||
      customer.email.toLowerCase().includes(term) ||
      customer.role.toLowerCase().includes(term) ||
      customer.nik.toLowerCase().includes(term) ||
      customer.statusPekerjaan.toLowerCase().includes(term)
    );
  }

  onEdit(row: any): void {
    this.router.navigate([`/customer/edit/${row.id}`]);
  }
}
