import { Injectable } from '@angular/core';
import { BaseAPIService } from './base-api.service';
import { LibrarianLogin, UserLogin } from '../dtos/index.dto';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private baseAPIService: BaseAPIService, private route: Router) {}

  loginAsLibrarian() {
    const path = 'api/login-librarian';
    this.baseAPIService.post<LibrarianLogin>(path).subscribe((librarian) => {
      this.storeUser('user', librarian);
      this.route.navigate(['librarian']);
    });
  }

  loginAsUser() {
    const path = 'api/login-user';
    this.baseAPIService.post<UserLogin>(path).subscribe((user) => {
      this.storeUser('user', user);
      this.route.navigate(['dashboard']);
    });
  }

  storeUser<T>(token: string, data: T) {
    localStorage.setItem(token, JSON.stringify(data));
  }

  logout() {
    localStorage.clear();
    this.route.navigate(['login']);
  }
}
