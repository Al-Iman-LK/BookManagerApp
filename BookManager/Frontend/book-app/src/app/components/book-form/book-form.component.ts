import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.css'
})
export class BookFormComponent implements OnChanges {
  @Input() book: Book | null = null;
  @Input() isEditing = false;
  @Output() bookSaved = new EventEmitter<Book>();

  bookForm: FormGroup;
  submitted = false;
  
  constructor(private formBuilder: FormBuilder, private bookService: BookService) {
    this.bookForm = this.createForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['book'] && this.book) {
      this.bookForm.patchValue({
        ...this.book,
        publicationDate: this.formatDate(new Date(this.book.publicationDate))
      });
    } else if (changes['book'] && !this.book) {
      this.bookForm.reset();
    }
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      id: [0],
      title: ['', [Validators.required]],
      author: ['', [Validators.required]],
      isbn: ['', [Validators.required]],
      publicationDate: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.bookForm.invalid) {
      return;
    }

    const bookData: Book = {
      ...this.bookForm.value,
      publicationDate: new Date(this.bookForm.value.publicationDate)
    };

    if (this.isEditing && this.book) {
      this.bookService.updateBook(this.book.id, bookData).subscribe({
        next: () => {
          this.bookSaved.emit(bookData);
          this.resetForm();
        },
        error: (error) => {
          console.error('Error updating book:', error);
        }
      });
    } else {
      this.bookService.addBook(bookData).subscribe({
        next: (newBook) => {
          this.bookSaved.emit(newBook);
          this.resetForm();
        },
        error: (error) => {
          console.error('Error creating book:', error);
        }
      });
    }
  }

  resetForm(): void {
    this.submitted = false;
    this.bookForm.reset({
      id: 0
    });
  }
}
