import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private authService: AuthService){}
  title = 'Login';

  loginAsLibrarian() {
    // Add navigation logic here
    this.authService.loginAsLibrarian()
  }
  
  loginAsUser() {
    this.authService.loginAsUser()
    // Add navigation logic here
  }
}
