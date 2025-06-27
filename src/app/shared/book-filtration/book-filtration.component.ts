import { Component, DestroyRef, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { BooksService } from '../../services/books.service';
import { AuthService } from '../../services/auth.service';
import { debounceTime } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-book-filtration',
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
  ],
  templateUrl: './book-filtration.component.html',
  styleUrl: './book-filtration.component.scss',
})
export class BookFiltrationComponent {
  destroyRef = inject(DestroyRef);
  fb = inject(FormBuilder);
  filterForm = this.fb.group({
    searchByTitle: new FormControl<boolean>(true, { nonNullable: true }),
    searchByAuthor: new FormControl<boolean>(false, { nonNullable: true }),
    filterUnavailable: new FormControl<boolean>(false, { nonNullable: true }),
  });
  searchInput = new FormControl<string>('', { nonNullable: true });
  constructor(private bookService: BooksService) {}
  ngOnInit(): void {
    this.searchInput.valueChanges
      .pipe(debounceTime(500))
      .subscribe(this.onFilter);
    this.filterForm.valueChanges
      .pipe(debounceTime(500))
      .subscribe(this.onFilter);
  }

  onFilter = () => {
    const params: Record<string, string> = {};
    if (this.searchByTitle) {
      params['title_like'] = this.SearchInputValue;
    }
    if (this.searchByAuthor) {
      params['author_like'] = this.SearchInputValue;
    }
    if (this.filterUnavailable) {
      params['available'] = 'true';
    }
    this.bookService.getBooks(params).subscribe();
  };

  get SearchInputValue() {
    return this.searchInput.getRawValue();
  }

  get searchByTitle() {
    return this.filterForm.get('searchByTitle')!.value;
  }

  get searchByAuthor() {
    return this.filterForm.get('searchByAuthor')!.value;
  }

  get filterUnavailable() {
    return this.filterForm.get('filterUnavailable')!.value;
  }
}
