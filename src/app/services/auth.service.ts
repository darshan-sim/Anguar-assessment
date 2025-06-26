import { Injectable } from '@angular/core';
import { BaseAPIService } from './base-api.service';
import { LibrarianLogin, UserLogin } from '../dtos/index.dto';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _user!: UserLogin;
  constructor(private baseAPIService: BaseAPIService, private route: Router) {}

  loginAsLibrarian() {
    const path = 'api/login-librarian';
    this.baseAPIService.post<{}, LibrarianLogin>(path,{}).subscribe((librarian) => {
      this.storeUser('user', librarian);
      this.route.navigate(['librarian']);
    });
  }

  loginAsUser() {
    const path = 'api/login-user';
    this.baseAPIService.post<{}, UserLogin>(path, {}).subscribe((user) => {
      this.storeUser('user', user);
      this._user = user;
      this.route.navigate(['dashboard']);
    });
  }

  storeUser<T>(token: string, data: T) {
    localStorage.setItem(token, JSON.stringify(data));
  }

  getAuthToken() {
    if (!this._user) {
      this.setUser();
    }
    return this._user ? this._user.token : '';
  }

  setUser() {
    const localUser = localStorage.getItem('user');
    if (localUser) {
      this._user = JSON.parse(localUser);
    }
  }

  getUser() {
    if (!this._user) {
      this.setUser();
    }
    return this._user;
  }

  logout() {
    localStorage.clear();
    this.route.navigate(['login']);
  }
}
