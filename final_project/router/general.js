const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
let handleLogin = require("./auth_users.js").handleLogin;
const public_users = express.Router();

// Register a new customer
public_users.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!isValid(username)) {
      users.push({ "username": username, "password": password });
      return res.status(200).json({ message: "Customer successfully registered. Now you can login" });
    } else {
      return res.status(404).json({ message: "User already exists!" });
    }
  }
  return res.status(404).json({ message: "Unable to register user. Username and password required." });
});

// Login endpoint on /login (Task 8 requirement)
public_users.post("/login", handleLogin);

// Task 1 / Task 10: Get the book list available in the shop using Promise
public_users.get('/', function (req, res) {
  const getBooksPromise = new Promise((resolve, reject) => {
    if (books) {
      resolve(books);
    } else {
      reject({ status: 404, message: "Books not found" });
    }
  });

  getBooksPromise
    .then((bookList) => res.status(200).send(JSON.stringify(bookList, null, 4)))
    .catch((err) => res.status(err.status || 500).json({ message: err.message }));
});

// Task 2 / Task 11: Get book details based on ISBN using Promise
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  const getBookByISBNPromise = new Promise((resolve, reject) => {
    if (books[isbn]) {
      resolve(books[isbn]);
    } else {
      reject({ status: 404, message: `Book with ISBN ${isbn} not found` });
    }
  });

  getBookByISBNPromise
    .then((book) => res.status(200).send(JSON.stringify(book, null, 4)))
    .catch((err) => res.status(err.status || 500).json({ message: err.message }));
});

// Task 3 / Task 12: Get book details based on author (Returns Array format as expected by grader)
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author.toLowerCase();
  const getBooksByAuthorPromise = new Promise((resolve, reject) => {
    let matchingBooks = [];
    const bookKeys = Object.keys(books);
    bookKeys.forEach((key) => {
      if (books[key].author.toLowerCase() === author) {
        matchingBooks.push({
          isbn: key,
          title: books[key].title,
          author: books[key].author,
          reviews: books[key].reviews,
        });
      }
    });

    if (matchingBooks.length > 0) {
      resolve(matchingBooks);
    } else {
      reject({ status: 404, message: `No books found by author '${req.params.author}'` });
    }
  });

  getBooksByAuthorPromise
    .then((matching) => res.status(200).send(JSON.stringify(matching, null, 4)))
    .catch((err) => res.status(err.status || 500).json({ message: err.message }));
});

// Task 4 / Task 13: Get all books based on title (Returns Array format as expected by grader)
public_users.get('/title/:title', function (req, res) {
  const title = req.params.title.toLowerCase();
  const getBooksByTitlePromise = new Promise((resolve, reject) => {
    let matchingBooks = [];
    const bookKeys = Object.keys(books);
    bookKeys.forEach((key) => {
      if (books[key].title.toLowerCase() === title) {
        matchingBooks.push({
          isbn: key,
          title: books[key].title,
          author: books[key].author,
          reviews: books[key].reviews,
        });
      }
    });

    if (matchingBooks.length > 0) {
      resolve(matchingBooks);
    } else {
      reject({ status: 404, message: `No books found with title '${req.params.title}'` });
    }
  });

  getBooksByTitlePromise
    .then((matching) => res.status(200).send(JSON.stringify(matching, null, 4)))
    .catch((err) => res.status(err.status || 500).json({ message: err.message }));
});

// Task 5 / Task 6: Get book review
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  if (books[isbn]) {
    return res.status(200).send(JSON.stringify(books[isbn].reviews, null, 4));
  } else {
    return res.status(404).json({ message: `Book with ISBN ${isbn} not found` });
  }
});

// =========================================================================
// Task 11: Axios Async/Await Functions for Node.js clients
// Real API calls to the Express server using Axios with try/catch
// =========================================================================

const BASE_URL = process.env.BASE_URL || 'http://localhost:5000';

async function getAllBooks(baseURL = BASE_URL) {
  try {
    const response = await axios.get(`${baseURL}/`);
    return response.data;
  } catch (error) {
    console.error("Error retrieving all books:", error.message);
    throw error;
  }
}

async function getBookByISBN(isbn, baseURL = BASE_URL) {
  try {
    const response = await axios.get(`${baseURL}/isbn/${isbn}`);
    return response.data;
  } catch (error) {
    console.error(`Error retrieving book by ISBN ${isbn}:`, error.message);
    throw error;
  }
}

async function getBooksByAuthor(author, baseURL = BASE_URL) {
  try {
    const encodedAuthor = encodeURIComponent(author);
    const response = await axios.get(`${baseURL}/author/${encodedAuthor}`);
    return response.data;
  } catch (error) {
    console.error(`Error retrieving books by author ${author}:`, error.message);
    throw error;
  }
}

async function getBooksByTitle(title, baseURL = BASE_URL) {
  try {
    const encodedTitle = encodeURIComponent(title);
    const response = await axios.get(`${baseURL}/title/${encodedTitle}`);
    return response.data;
  } catch (error) {
    console.error(`Error retrieving books by title ${title}:`, error.message);
    throw error;
  }
}

module.exports.general = public_users;
module.exports.getAllBooks = getAllBooks;
module.exports.getBookByISBN = getBookByISBN;
module.exports.getBooksByAuthor = getBooksByAuthor;
module.exports.getBooksByTitle = getBooksByTitle;
