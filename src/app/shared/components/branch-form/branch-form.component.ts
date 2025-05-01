import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-branch-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './branch-form.component.html',
})
export class BranchFormComponent {
  @Input() branch: any = {
    name: '',
    address: '',
    latitude: null,
    longitude: null
  };
  @Input() isLoading: boolean = false;
  @Input() title: string = 'Form Cabang'; // agar bisa dinamis (Tambah Cabang / Edit Cabang)
  @Input() submitButtonText: string = 'Simpan'; // supaya bisa "Simpan" atau "Update" misalnya

  @Output() formSubmit = new EventEmitter<void>(); // kirim ke parent saat submit

  onSubmit(): void {
    this.formSubmit.emit();
  }
}
