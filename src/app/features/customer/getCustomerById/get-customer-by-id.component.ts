import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CustomerService } from 'src/app/core/services/customer.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detail-customer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './get-customer-by-id.component.html',
})
export class DetailCustomerComponent implements OnInit {
  customer: any = null;
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getCustomerDetail(id);
    } else {
      this.toastr.error('ID customer tidak ditemukan');
    }
  }

  getCustomerDetail(id: string): void {
    this.isLoading = true;
    this.customerService.getCustomerById(id).subscribe({
      next: (data) => {
        console.log('Customer data:', data);
        this.customer = data;
      },
      error: (err) => {
        console.error('Error saat ambil data customer:', err);
        this.toastr.error('Gagal mengambil data customer');
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}
