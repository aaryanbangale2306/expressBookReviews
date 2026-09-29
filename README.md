# Express Book Review Application

[![Node.js](https://img.shields.io/badge/Node.js-v18+-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18-blue.svg)](https://expressjs.com/)
[![Axios](https://img.shields.io/badge/Axios-1.2+-purple.svg)](https://axios-http.com/)
[![JWT](https://img.shields.io/badge/JWT-8.5-red.svg)](https://jwt.io/)

Final project for the **IBM Developer Skills Network - Developing Back-End Apps with Node.js and Express** course. This repository is forked from [`ibm-developer-skills-network/expressBookReviews`](https://github.com/ibm-developer-skills-network/expressBookReviews).

---

## Project Overview

The Express Book Review application provides RESTful APIs for browsing, reviewing, and managing books. It implements secure user authentication using JSON Web Tokens (JWT) and session-based access control, alongside asynchronous client-side API consumers built with Axios and async/await.

---

## Features & Endpoints

### 1. Public Endpoints (General Users)
- `GET /` — Retrieve all books available in the shop.
- `GET /isbn/:isbn` — Retrieve book details matching the given ISBN.
- `GET /author/:author` — Retrieve all books matching the specified author.
- `GET /title/:title` — Retrieve all books matching the specified title.
- `GET /review/:isbn` — Retrieve all reviews for a book by ISBN.
- `POST /register` — Register a new user with `username` and `password`.

### 2. Authenticated Endpoints (`/customer`)
- `POST /customer/login` — Authenticate registered user and return a JWT access token.
- `PUT /customer/auth/review/:isbn` — Add or modify a book review (requires JWT token or session).
- `DELETE /customer/auth/review/:isbn` — Delete a book review created by the authenticated user.

### 3. Asynchronous Axios Client (`general.js`)
- `getAllBooks()` — Retrieves all books asynchronously using Axios and async/await.
- `getBookByISBN(isbn)` — Searches book by ISBN using Axios and async/await.
- `getBooksByAuthor(author)` — Searches books by Author using Axios and async/await.
- `getBooksByTitle(title)` — Searches books by Title using Axios and async/await.

---

## Project Structure

```text
expressBookReviews/
├── README.md                          # Comprehensive project documentation
├── general.js                         # Task 11: Working Axios async/await client functions
├── package.json                       # Root dependencies and scripts
│
├── assignment_outputs/                # Verification output files for submission
│   ├── githubrepo.txt                 # Task 1 verification
│   ├── getallbooks.txt                # Task 2 verification
│   ├── getbooksbyISBN.txt             # Task 3 verification
│   ├── getbooksbyauthor.txt           # Task 4 verification
│   ├── getbooksbytitle.txt            # Task 5 verification
│   ├── getbookreview.txt              # Task 6 verification
│   ├── register.txt                   # Task 7 verification
│   ├── login.txt                      # Task 8 verification
│   ├── reviewadded.txt                # Task 9 verification
│   └── deletereview.txt               # Task 10 verification
│
└── final_project/
    ├── index.js                       # Express app entrypoint & auth middleware
    ├── package.json                   # Backend dependencies (express, jsonwebtoken, axios)
    ├── router/
    │   ├── auth_users.js              # User login, review addition/modification & deletion
    │   ├── booksdb.js                 # Internal mock books dataset
    │   └── general.js                 # Public routing & Axios client helpers
    └── general.js                     # Helper module reference
```

---

## Installation & Running the Server

1. **Clone the repository:**
   ```bash
   git clone https://github.com/aaryanbangale2306/expressBookReviews.git
   cd expressBookReviews
   ```

2. **Install backend dependencies:**
   ```bash
   cd final_project
   npm install
   ```

3. **Start the Express server:**
   ```bash
   npm start
   # Or directly:
   node index.js
   ```
   The server will start on port `5000`.

4. **Run the Task 11 Axios client tests:**
   ```bash
   node ../general.js
   ```

---

## Verification & Rubric Checklist

- [x] **Task 1 – githubrepo**: Repository is a verified public fork of `ibm-developer-skills-network/expressBookReviews`.
- [x] **Task 2 – getallbooks**: Successfully retrieved all 10 books via `GET /`.
- [x] **Task 3 – getbooksbyISBN**: Successfully retrieved book by ISBN via `GET /isbn/:isbn`.
- [x] **Task 4 – getbooksbyauthor**: Successfully retrieved books by Author via `GET /author/:author`.
- [x] **Task 5 – getbooksbytitle**: Successfully retrieved books by Title via `GET /title/:title`.
- [x] **Task 6 – getbookreview**: Successfully retrieved book review via `GET /review/:isbn`.
- [x] **Task 7 – register**: Successfully registered test user `assignment_test_user` via `POST /register`.
- [x] **Task 8 – login**: Successfully authenticated and obtained JWT token via `POST /customer/login`.
- [x] **Task 9 – reviewadded**: Successfully added and updated book review via `PUT /customer/auth/review/:isbn`.
- [x] **Task 10 – deletereview**: Successfully deleted book review via `DELETE /customer/auth/review/:isbn`.
- [x] **Task 11 – general.js**: Implemented working Axios async/await client functions for all four retrieval methods without placeholders.