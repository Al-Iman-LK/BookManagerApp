# Book Manager Application

A full-stack web application for managing a collection of books. Users can add new books, view the list of books, edit existing books, and delete books they no longer need. The application leverages Angular for the frontend and ASP.NET Core Web API for the backend.

## Table of Contents
- [Features](#features)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)
- [Future Improvements](#future-improvements)

## Technologies Used

### Backend
- **ASP.NET Core Web API**: Framework for building RESTful APIs
- **C#**: Programming language
- **In-Memory Data Store**: Simple data storage solution for the book collection

### Frontend
- **Angular**: Frontend framework
- **TypeScript**: Programming language
- **HTML/CSS**: Markup and styling
- **Bootstrap**: CSS framework for responsive design
- **Reactive Forms**: Form handling and validation

## Features

- **Create:** Add new books with title, author, ISBN, and publication date
- **Read:** View a list of all books with their details
- **Update:** Edit existing book information
- **Delete:** Remove books from the collection
- **Form Validation:** Ensure all required fields are filled with appropriate data
- **Responsive Design:** Works on various screen sizes using Bootstrap

## Project Structure

The project is organized into two main directories:

### Backend (ASP.NET Core Web API)
```
BookManager/Backend/BookManager.API/
├── Controllers/
│   └── BooksController.cs
├── Models/
│   └── Book.cs
├── Program.cs
└── ...
```

### Frontend (Angular)
```
BookManager/Frontend/book-app/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── book-form/
│   │   │   └── book-list/
│   │   ├── models/
│   │   │   └── book.model.ts
│   │   ├── services/
│   │   │   └── book.service.ts
│   │   ├── app.component.ts
│   │   └── ...
│   ├── index.html
│   └── ...
└── ...
```

## Setup Instructions

### Prerequisites
- [.NET 9 SDK](https://dotnet.microsoft.com/download) or later
- [Node.js](https://nodejs.org/) (v16 or later)
- [Angular CLI](https://angular.io/cli)

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd BookManager/Backend/BookManager.API
   ```

2. Restore the required NuGet packages:
   ```
   dotnet restore
   ```

3. Run the API:
   ```
   dotnet run
   ```

The API will start running at `http://localhost:5016`.

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd BookManager/Frontend/book-app
   ```

2. Install the required npm packages:
   ```
   npm install
   ```

3. Start the Angular development server:
   ```
   npm start
   ```

4. Open your browser and navigate to `http://localhost:4200`.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | /api/books | Get all books |
| GET    | /api/books/{id} | Get a book by id |
| POST   | /api/books | Add a new book |
| PUT    | /api/books/{id} | Update a book |
| DELETE | /api/books/{id} | Delete a book |

## Future Improvements

- Add user authentication and authorization
- Implement persistent data storage with a database
- Add pagination for the book list
- Implement search and filter functionality
- Add unit and integration tests
- Add book categories and sorting options

## License

This project is licensed under the MIT License - see the LICENSE file for details.