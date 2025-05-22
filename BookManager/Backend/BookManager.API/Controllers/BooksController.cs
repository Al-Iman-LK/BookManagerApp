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
    {
        private static List<Book> _books = new List<Book>
        {
            new Book { Id = 1, Title = "The Great Gatsby", Author = "F. Scott Fitzgerald", ISBN = "9780743273565", PublicationDate = new DateTime(1925, 4, 10) },
            new Book { Id = 2, Title = "To Kill a Mockingbird", Author = "Harper Lee", ISBN = "9780061120084", PublicationDate = new DateTime(1960, 7, 11) },
            new Book { Id = 3, Title = "1984", Author = "George Orwell", ISBN = "9780451524935", PublicationDate = new DateTime(1949, 6, 8) }
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
