import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { BookFormComponent } from '../book-form/book-form.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, BookFormComponent, RouterModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  selectedBook: Book | null = null;
  isEditing = false;

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.getBooks().subscribe({
      next: (data) => {
        this.books = data;
      },
      error: (error) => {
        console.error('Error fetching books:', error);
      }
    });
  }

  deleteBook(id: number): void {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(id).subscribe({
        next: () => {
          this.books = this.books.filter(book => book.id !== id);
        },
        error: (error) => {
          console.error('Error deleting book:', error);
        }
      });
    }
  }

  editBook(book: Book): void {
    this.selectedBook = { ...book };
    this.isEditing = true;
  }

  onBookSaved(book: Book): void {
    this.loadBooks();
    this.resetForm();
  }

  resetForm(): void {
    this.selectedBook = null;
    this.isEditing = false;
  }
}
