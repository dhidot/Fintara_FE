import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class FirstLoginGuard implements CanActivate {
  constructor(private router: Router, private toastr: ToastrService) {}

  canActivate(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const isFirstLogin = localStorage.getItem('first_login') === 'true';

    if (isFirstLogin) {
      this.toastr.warning('Anda harus mengganti password terlebih dahulu.', 'Akses Ditolak', {
        positionClass: 'toast-bottom-right'
      });
      this.router.navigate(['pegawai/change-password']);
      return false;
    }

    return true;
  }
}
