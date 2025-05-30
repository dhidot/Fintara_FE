import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from '../src/app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { provideToastr } from 'ngx-toastr';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppHttpInterceptor } from './app/core/interceptors/interceptor.service';
// ngModal
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

bootstrapApplication(AppComponent, {
  providers: [
    NgbModal,
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withInterceptors([AppHttpInterceptor])),
    importProvidersFrom(FormsModule),
    provideToastr(),
  ],
});
