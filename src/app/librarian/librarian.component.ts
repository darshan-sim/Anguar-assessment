import { Component, effect, OnInit, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { BooksService } from '../services/books.service';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { BookDTO, BookUpdateDTO } from '../dtos/index.dto';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-librarian',
  imports: [
    MatCardModule,
    MatChipsModule,
    AsyncPipe,
    MatGridListModule,
    MatButtonModule,
  ],
  templateUrl: './librarian.component.html',
  styleUrl: './librarian.component.scss',
})
export class LibrarianComponent {
  books!: Observable<BookDTO[]>;

  constructor(private bookService: BooksService) { }

  ngOnInit(): void {
    this.books = this.bookService.getBooks();
  }

  deleteBook(id: number) {
    console.log('Delete book: ' + id);
    this.bookService.deleteBook(id);
  }

  updateBook(id: number, book: BookUpdateDTO) {
    this.bookService.updateBook(id, book);
  }

}
