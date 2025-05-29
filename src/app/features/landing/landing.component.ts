import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { PlafondService } from '../../core/services/plafond.service';
import Swiper from 'swiper';
import 'swiper/css/bundle';
import { LoanRequestService } from 'src/app/core/services/loan-request.service';
import { LoanSimulationDTO } from 'src/app/core/models/loan-simulation.dto';
import { LoanSimulationResponseDTO } from 'src/app/core/models/loan-simulation-response.dto';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
  standalone: true,
  imports: [CommonModule, CurrencyPipe, FormsModule],
})
export class LandingComponent implements OnInit {
  plafonds: any[] = [];
  selectedPlafond: string = ''; // Plafond yang dipilih user
  isLoading = true;
  errorMsg: string | null = null;
  swiper?: Swiper;
  loanAmount: number = 0;
  loanTenor: number = 0;
  formattedLoanAmount: string = '';
  simulationResult: LoanSimulationResponseDTO | null = null;

  constructor(private plafondService: PlafondService, private loanRequestService: LoanRequestService) {}

  ngOnInit(): void {
    this.loadPlafonds();
  }

  loadPlafonds(): void {
    this.plafondService.getAllPlafonds().subscribe({
      next: (data) => {
        this.plafonds = data;
        this.isLoading = false;

        setTimeout(() => {
          this.initSwiper();
        }, 0);
      },
      error: (error) => {
        console.error('Gagal memuat data plafond.', error);
        this.errorMsg = 'Gagal memuat data plafond.';
        this.isLoading = false;
      },
    });
  }

  getSelectedPlafond() {
    return this.plafonds.find(p => p.name === this.selectedPlafond);
  }

  onAmountInput(event: any) {
    let input = event.target.value;
    const numericValue = input.replace(/[^0-9]/g, '');
    const selectedPlafon = this.getSelectedPlafond();

    if (numericValue) {
      let parsed = parseInt(numericValue, 10);

      if (selectedPlafon && selectedPlafon.maxAmount) {
        parsed = Math.min(parsed, selectedPlafon.maxAmount);
      }

      this.loanAmount = parsed;
      this.formattedLoanAmount = this.loanAmount.toLocaleString('id-ID');
    } else {
      this.loanAmount = 0;
      this.formattedLoanAmount = '';
    }
  }

  onTenorInput() {
    const selectedPlafon = this.getSelectedPlafond();
    if (selectedPlafon && selectedPlafon.maxTenor) {
      this.loanTenor = Math.min(this.loanTenor, selectedPlafon.maxTenor);
    }
  }

  simulateLoan(): void {
    if (this.loanAmount <= 0 || this.loanTenor <= 0 || !this.selectedPlafond) {
      alert('Pilih plafon, jumlah pinjaman, dan tenor yang valid!');
      return;
    }

    const payload: LoanSimulationDTO = {
      amount: this.loanAmount,
      tenor: this.loanTenor,
      plafondName: this.selectedPlafond
    };

    this.loanRequestService.simulateLoan(payload).subscribe({
      next: (result) => {
        this.simulationResult = result;
      },
      error: (error) => {
        console.error('Gagal menghitung simulasi.', error);
        alert('Gagal menghitung simulasi. Silakan coba lagi.');
      }
    });
  }

  initSwiper() {
    if (this.swiper) {
      this.swiper.destroy(true, true);
    }

    this.swiper = new Swiper('.mySwiper', {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      breakpoints: {
        768: {
          slidesPerView: 2
        },
        1200: {
          slidesPerView: 3
        }
      }
    });
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
