import { Component, DestroyRef, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { BooksService } from '../services/books.service';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { BookDTO, BookUpdateDTO } from '../dtos/index.dto';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { BookCreateDialogComponent } from './book-create-dialog/book-create-dialog.component';
import { MatIcon } from '@angular/material/icon';
@Component({
  selector: 'app-librarian',
  imports: [
    MatCardModule,
    MatChipsModule,
    AsyncPipe,
    MatGridListModule,
    MatButtonModule,
    MatButton,
    MatIcon,
  ],
  templateUrl: './librarian.component.html',
  styleUrl: './librarian.component.scss',
})
export class LibrarianComponent {
  books!: Observable<BookDTO[]>;
  destroyRef = inject(DestroyRef);
  readonly dialog = inject(MatDialog);
  constructor(private bookService: BooksService) {}

  ngOnInit(): void {
    this.books = this.bookService.getBooks();
  }

  deleteBook(id: number) {
    console.log('Delete book: ' + id);
    const subscription = this.bookService.deleteBook(id).subscribe();
    this.destroyRef.onDestroy(subscription.unsubscribe);
  }

  onAddBook() {
    this.dialog.open(BookCreateDialogComponent, {
      data: { mode: 'create' },
    });
  }

  onUpdateBook(book: BookUpdateDTO) {
    this.dialog.open(BookCreateDialogComponent, {
      data: { book, mode: 'edit' },
    });
  }
}
