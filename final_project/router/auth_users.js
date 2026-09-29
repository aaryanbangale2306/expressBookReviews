const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => {
  // returns true if username already exists in records
  let userswithsamename = users.filter((user) => {
    return user.username === username;
  });
  return userswithsamename.length > 0;
};

const authenticatedUser = (username, password) => {
  // returns true if username and password match records
  let validusers = users.filter((user) => {
    return user.username === username && user.password === password;
  });
  return validusers.length > 0;
};

// Handle login for registered users
const handleLogin = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(404).json({ message: "Error logging in: username and password required" });
  }

  if (authenticatedUser(username, password)) {
    let accessToken = jwt.sign({ data: username }, 'access', { expiresIn: 60 * 60 });

    req.session.authorization = {
      accessToken,
      username
    };

    return res.status(200).json({
      message: "Customer successfully logged in",
      token: accessToken
    });
  } else {
    return res.status(208).json({ message: "Invalid Login. Check username and password" });
  }
};

// Route for /login and /customer/login
regd_users.post("/login", handleLogin);

// Add or update a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const review = req.query.review || (req.body && req.body.review);
  const username = req.session.authorization ? req.session.authorization['username'] : (req.user ? req.user.data : null);

  if (!review) {
    return res.status(400).json({ message: "Review text is required" });
  }

  if (!username) {
    return res.status(403).json({ message: "User not logged in" });
  }

  if (books[isbn]) {
    books[isbn].reviews[username] = review;
    return res.status(200).json({
      message: `The review for the book with ISBN ${isbn} has been added/updated.`,
      reviews: books[isbn].reviews
    });
  } else {
    return res.status(404).json({ message: `Book with ISBN ${isbn} not found` });
  }
});

// Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const username = req.session.authorization ? req.session.authorization['username'] : (req.user ? req.user.data : null);

  if (!username) {
    return res.status(403).json({ message: "User not logged in" });
  }

  if (!books[isbn]) {
    return res.status(404).json({ message: `Book with ISBN ${isbn} not found` });
  }

  if (books[isbn].reviews && books[isbn].reviews[username]) {
    delete books[isbn].reviews[username];
    return res.status(200).json({
      message: `Review for ISBN ${isbn} deleted`
    });
  } else {
    return res.status(404).json({ message: `Review for ISBN ${isbn} not found` });
  }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.authenticatedUser = authenticatedUser;
module.exports.handleLogin = handleLogin;
module.exports.users = users;
