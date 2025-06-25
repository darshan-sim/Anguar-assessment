import { computed, Injectable, signal } from '@angular/core';
import { BaseAPIService } from './base-api.service';
import { BookDTO, BookUpdateDTO } from '../dtos/index.dto';
import { catchError, map, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  constructor(private baseAPIService: BaseAPIService) {}

  getBooks():Observable<BookDTO[]> {
    const path = 'api/books';
    return this.baseAPIService.get<BookDTO[]>(path).pipe(
      tap((data) => console.log(data)),
      catchError((err) => throwError(err))
    );
  }

  deleteBook(id: number): void {
    const path = 'api/books/'+ id;
    this.baseAPIService.delete(path)
  }

  updateBook(id: number, book: BookUpdateDTO): void {
    const path = 'api/books/'+ id;
    this.baseAPIService.put(path, book)
  }
}
