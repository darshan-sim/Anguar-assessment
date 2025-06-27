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
import { AuthService } from '../services/auth.service';
import { BookFiltrationComponent } from "../shared/book-filtration/book-filtration.component";
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
    BookFiltrationComponent
],
  templateUrl: './librarian.component.html',
  styleUrl: './librarian.component.scss',
})
export class LibrarianComponent {
  books$ = new Observable<BookDTO[]>();

  destroyRef = inject(DestroyRef);
  readonly dialog = inject(MatDialog);
  constructor(
    private bookService: BooksService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.bookService.getBooks().subscribe();
    this.books$ = this.bookService.books$;
  }

  deleteBook(id: number) {
    const subscription = this.bookService.deleteBook(id).subscribe();
    this.destroyRef.onDestroy(subscription.unsubscribe);
  }

  onAddBook() {
    this.dialog.open(BookCreateDialogComponent, {
      data: { mode: 'create' },
    });
  }

  onUpdateBook(book: BookUpdateDTO) {
    const dialog = this.dialog.open(BookCreateDialogComponent, {
      data: { book, mode: 'edit' },
    });
  }

  onLogout() {
    this.authService.logout();
  }
}
