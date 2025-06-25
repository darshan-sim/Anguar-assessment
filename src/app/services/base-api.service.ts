import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BaseAPIService {
  private _baseUrl = 'http://localhost:3000/';
  constructor(private http: HttpClient) {}

  get<T>(path: string): Observable<T> {
    console.log('get called');
    return this.http.get<T>(this._baseUrl + path);
  }

  post<T, U=T>(path: string):Observable<U>{
    console.log('get called');
    return this.http.post<U>(this._baseUrl + path, {});
  }
}
