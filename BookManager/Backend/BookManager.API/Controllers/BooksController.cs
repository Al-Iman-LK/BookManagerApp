using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using BookManager.API.Models;

namespace BookManager.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BooksController : ControllerBase
    {        private static List<Book> _books = new List<Book>
        {
            new Book { Id = 1, Title = "The Great Gatsby", Author = "F. Scott Fitzgerald", ISBN = "9780743273565", PublicationDate = new DateTime(1925, 4, 10) },
            new Book { Id = 2, Title = "To Kill a Mockingbird", Author = "Harper Lee", ISBN = "9780061120084", PublicationDate = new DateTime(1960, 7, 11) },
            new Book { Id = 3, Title = "1984", Author = "George Orwell", ISBN = "9780451524935", PublicationDate = new DateTime(1949, 6, 8) },
            new Book { Id = 4, Title = "Animal Farm", Author = "George Orwell", ISBN = "9780451526342", PublicationDate = new DateTime(1945, 8, 17) },
            new Book { Id = 5, Title = "Pride and Prejudice", Author = "Jane Austen", ISBN = "9780141439518", PublicationDate = new DateTime(1813, 1, 28) },
            new Book { Id = 6, Title = "The Catcher in the Rye", Author = "J.D. Salinger", ISBN = "9780316769174", PublicationDate = new DateTime(1951, 7, 16) },
            new Book { Id = 7, Title = "Lord of the Flies", Author = "William Golding", ISBN = "9780571056866", PublicationDate = new DateTime(1954, 9, 17) },
            new Book { Id = 8, Title = "The Hobbit", Author = "J.R.R. Tolkien", ISBN = "9780547928227", PublicationDate = new DateTime(1937, 9, 21) },
            new Book { Id = 9, Title = "Fahrenheit 451", Author = "Ray Bradbury", ISBN = "9781451673319", PublicationDate = new DateTime(1953, 10, 19) },
            new Book { Id = 10, Title = "Sense and Sensibility", Author = "Jane Austen", ISBN = "9780141439662", PublicationDate = new DateTime(1811, 10, 30) },
            new Book { Id = 11, Title = "Emma", Author = "Jane Austen", ISBN = "9780141439587", PublicationDate = new DateTime(1815, 12, 23) },
            new Book { Id = 12, Title = "The Fellowship of the Ring", Author = "J.R.R. Tolkien", ISBN = "9780547928210", PublicationDate = new DateTime(1954, 7, 29) },
            new Book { Id = 13, Title = "Tender Is the Night", Author = "F. Scott Fitzgerald", ISBN = "9780684801544", PublicationDate = new DateTime(1934, 4, 12) },
            new Book { Id = 14, Title = "Brave New World", Author = "Aldous Huxley", ISBN = "9780060850524", PublicationDate = new DateTime(1932, 8, 30) },
            new Book { Id = 15, Title = "The Martian Chronicles", Author = "Ray Bradbury", ISBN = "9780380977314", PublicationDate = new DateTime(1950, 5, 4) }
        };

        // GET: api/books
        [HttpGet]
        public ActionResult<IEnumerable<Book>> GetBooks()
        {
            return Ok(_books);
        }

        // GET: api/books/5
        [HttpGet("{id}")]
        public ActionResult<Book> GetBook(int id)
        {
            var book = _books.FirstOrDefault(b => b.Id == id);
            
            if (book == null)
            {
                return NotFound();
            }

            return Ok(book);
        }

        // POST: api/books
        [HttpPost]
        public ActionResult<Book> CreateBook(Book book)
        {
            if (book == null)
            {
                return BadRequest();
            }
            
            // Set ID (simple auto-increment)
            book.Id = _books.Count > 0 ? _books.Max(b => b.Id) + 1 : 1;
            
            _books.Add(book);
            
            return CreatedAtAction(nameof(GetBook), new { id = book.Id }, book);
        }

        // PUT: api/books/5
        [HttpPut("{id}")]
        public IActionResult UpdateBook(int id, Book book)
        {
            if (id != book.Id || book == null)
            {
                return BadRequest();
            }

            var existingBook = _books.FirstOrDefault(b => b.Id == id);
            
            if (existingBook == null)
            {
                return NotFound();
            }

            // Update properties
            existingBook.Title = book.Title;
            existingBook.Author = book.Author;
            existingBook.ISBN = book.ISBN;
            existingBook.PublicationDate = book.PublicationDate;

            return NoContent();
        }

        // DELETE: api/books/5
        [HttpDelete("{id}")]
        public IActionResult DeleteBook(int id)
        {
            var book = _books.FirstOrDefault(b => b.Id == id);
            
            if (book == null)
            {
                return NotFound();
            }

            _books.Remove(book);
            
            return NoContent();
        }
    }
}
