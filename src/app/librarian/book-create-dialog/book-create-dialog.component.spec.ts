import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCreateDialogComponent } from './book-create-dialog.component';

describe('BookCreateDialogComponent', () => {
  let component: BookCreateDialogComponent;
  let fixture: ComponentFixture<BookCreateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookCreateDialogComponent]    })
    .compileComponents();

    fixture = TestBed.createComponent(BookCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
