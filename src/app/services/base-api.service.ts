import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BaseAPIService {
  private _baseUrl = 'http://localhost:3000/';
  constructor(private http: HttpClient) {}

  get<T>(path: string, params?: Record<string, string>): Observable<T> {
    return this.http.get<T>(this._baseUrl + path, {
      params: params,
    });
  }

  post<T, U = T>(path: string, data: T): Observable<U> {
    return this.http.post<U>(this._baseUrl + path, data);
  }

  put<T, U = T>(path: string, data: T): Observable<U> {
    return this.http.put<U>(this._baseUrl + path, data);
  }

  delete<T>(path: string): Observable<void> {
    return this.http.delete<void>(this._baseUrl + path, {});
  }
}
