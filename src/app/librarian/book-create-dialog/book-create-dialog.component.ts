import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioButton, MatRadioModule } from '@angular/material/radio';
import { BooksService } from '../../services/books.service';
import { BookDTO, BookUpdateDTO } from '../../dtos/index.dto';

@Component({
  selector: 'app-book-create-dialog',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatRadioModule,
  ],
  templateUrl: './book-create-dialog.component.html',
  styleUrl: './book-create-dialog.component.scss',
  standalone: true,
})
export class BookCreateDialogComponent implements OnInit {
  data = inject(MAT_DIALOG_DATA);
  fb = inject(FormBuilder);
  dialogRef = inject(MatDialogRef<BookCreateDialogComponent>);
  destroyRef = inject(DestroyRef);
  bookService = inject(BooksService);
  bookForm = this.fb.group({
    title: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    author: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    available: new FormControl<boolean>(false, {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  ngOnInit(): void {
    this.onReset();
  }

  onSubmit() {
    if (this.bookForm.invalid) {
      this.bookForm.markAllAsTouched();
      this.bookForm.markAsDirty();
      return;
    }
    const { title, author, available } = this.bookForm.getRawValue();
    if (this.isEditMode) {
      this.onUpdate({
        title,
        author,
        available,
      });
    } else {
      this.onCreate({
        id: new Date().getTime(),
        title,
        author,
        available,
      });
    }
  }

  onCreate(updateBook: BookDTO) {
    const subscription = this.bookService.createBook(updateBook).subscribe({
      next: (updatedBook) => {
        this.data.book = updatedBook;
      },
      error: (error) => {
        console.error('Error creating book:', error);
      },
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
    this.dialogRef.close();
  }

  onUpdate(updateBook: BookUpdateDTO) {
    const subscription = this.bookService
      .updateBook(this.data.book.id, updateBook)
      .subscribe({
        next: (updatedBook) => {
          this.data.book = updatedBook;
        },
        error: (error) => {
          console.error('Error updating book:', error);
        },
      });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
    this.dialogRef.close();
  }

  onReset() {
    this.bookForm.patchValue(this.data.book);
  }

  get titleError() {
    return (
      this.bookForm.touched && this.bookForm.get('title')?.getError('required')
    );
  }
  get authorError() {
    return (
      this.bookForm.touched && this.bookForm.get('author')?.getError('required')
    );
  }
  get availableError() {
    return (
      this.bookForm.touched &&
      this.bookForm.get('available')?.getError('required')
    );
  }
  get isEditMode() {
    return this.data.mode === 'edit';
  }
}
