import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIcon } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { BookDTO } from '../dtos/index.dto';
import { BooksService } from '../services/books.service';
import { AuthService } from '../services/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BookFiltrationComponent } from '../shared/book-filtration/book-filtration.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    MatCardModule,
    MatChipsModule,
    AsyncPipe,
    MatGridListModule,
    MatButtonModule,
    MatButton,
    MatIcon,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    BookFiltrationComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  books$ = new Observable<BookDTO[]>();
  destroyRef = inject(DestroyRef);
  constructor(
    private bookService: BooksService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.bookService.getBooks().subscribe();
    this.books$ = this.bookService.books$;
  }

  onLogout() {
    this.authService.logout();
  }
}
