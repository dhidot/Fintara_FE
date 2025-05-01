import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-auth-wrapper',
  standalone: true,
  templateUrl: './auth-wrapper.component.html',
  styleUrls: ['./auth-wrapper.component.css']
})
export class AuthWrapperComponent {
  @Input() title: string = '';
}
