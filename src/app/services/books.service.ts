import { computed, Injectable, signal } from '@angular/core';
import { BaseAPIService } from './base-api.service';
import { BookDTO, BookUpdateDTO } from '../dtos/index.dto';
import {
  BehaviorSubject,
  catchError,
  debounce,
  debounceTime,
  interval,
  map,
  Observable,
  shareReplay,
  tap,
  throwError,
  timeInterval,
  timer,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private _books$ = new BehaviorSubject<BookDTO[]>([]);
  readonly books$ = this._books$.asObservable();
  constructor(private baseAPIService: BaseAPIService) {}

  getBooks(params?: Record<string, string>) {
    const path = 'api/books';
    return this.baseAPIService.get<BookDTO[]>(path, params).pipe(
      catchError((err) => throwError(err)),
      tap((data) => this._books$.next(data)),
      shareReplay(1)
    );
  }

  deleteBook(id: number): Observable<void> {
    const path = 'api/books/' + id;
    return this.baseAPIService.delete(path).pipe(
      catchError((error) => throwError(error)),
      tap(() => {
        const books = this._books$.getValue();
        const newBooks = books.filter((book) => book.id !== id);
        this._books$.next(newBooks);
      }),
      shareReplay(1)
    );
  }

  updateBook(id: number, book: BookUpdateDTO) {
    const path = 'api/books/' + id;
    return this.baseAPIService.put(path, book).pipe(
      catchError((err) => throwError(err)),
      tap(() => {
        const books = this._books$.getValue();
        const updatedBookIndex = books.findIndex((book) => book.id === id);
        const newBooks = books.slice(0);
        newBooks[updatedBookIndex] = {
          ...newBooks[updatedBookIndex],
          ...book,
        };
        this._books$.next(newBooks);
      }),
      shareReplay(1)
    );
  }

  createBook(book: BookDTO): Observable<BookDTO> {
    const path = 'api/books/';
    return this.baseAPIService.post<BookDTO>(path, book).pipe(
      catchError((error) => throwError(error)),
      tap((newBook: BookDTO) => {
        const books = this._books$.getValue();
        const newBooks = books.slice(0);
        newBooks.push(newBook);
        this._books$.next(newBooks);
      }),
      shareReplay(1)
    );
  }
}
