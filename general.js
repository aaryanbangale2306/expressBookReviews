/**
 * ============================================================================
 * Task 11 — general.js (8 Points)
 * Node.js Axios Client for IBM Express Book Review Application
 * ============================================================================
 * Implements asynchronous requests using Axios and async/await with try/catch
 * to consume the Express Book Review API endpoints:
 *   1. Retrieve all books
 *   2. Retrieve books by ISBN
 *   3. Retrieve books by Author
 *   4. Retrieve books by Title
 * ============================================================================
 */

const axios = require('axios');

const BASE_URL = process.env.BASE_URL || 'http://localhost:5000';

/**
 * Task 10: Retrieve all books available in the shop
 * Endpoint: GET /
 */
async function getAllBooks(baseURL = BASE_URL) {
  try {
    const response = await axios.get(`${baseURL}/`);
    return response.data;
  } catch (error) {
    console.error('Error in getAllBooks:', error.response ? error.response.data : error.message);
    throw error;
  }
}

/**
 * Task 11: Retrieve book details based on ISBN
 * Endpoint: GET /isbn/:isbn
 */
async function getBookByISBN(isbn, baseURL = BASE_URL) {
  try {
    const response = await axios.get(`${baseURL}/isbn/${isbn}`);
    return response.data;
  } catch (error) {
    console.error(`Error in getBookByISBN (${isbn}):`, error.response ? error.response.data : error.message);
    throw error;
  }
}

/**
 * Task 12: Retrieve books based on Author
 * Endpoint: GET /author/:author
 */
async function getBooksByAuthor(author, baseURL = BASE_URL) {
  try {
    const encodedAuthor = encodeURIComponent(author);
    const response = await axios.get(`${baseURL}/author/${encodedAuthor}`);
    return response.data;
  } catch (error) {
    console.error(`Error in getBooksByAuthor (${author}):`, error.response ? error.response.data : error.message);
    throw error;
  }
}

/**
 * Task 13: Retrieve books based on Title
 * Endpoint: GET /title/:title
 */
async function getBooksByTitle(title, baseURL = BASE_URL) {
  try {
    const encodedTitle = encodeURIComponent(title);
    const response = await axios.get(`${baseURL}/title/${encodedTitle}`);
    return response.data;
  } catch (error) {
    console.error(`Error in getBooksByTitle (${title}):`, error.response ? error.response.data : error.message);
    throw error;
  }
}

// Self-test execution when run directly: node general.js
if (require.main === module) {
  (async () => {
    console.log('Testing Task 11 Axios functions against:', BASE_URL);
    try {
      console.log('\n--- 1. Testing getAllBooks() ---');
      const allBooks = await getAllBooks();
      console.log('Total books retrieved:', Object.keys(allBooks).length);

      console.log('\n--- 2. Testing getBookByISBN(1) ---');
      const bookByIsbn = await getBookByISBN(1);
      console.log('Book retrieved:', bookByIsbn);

      console.log('\n--- 3. Testing getBooksByAuthor("Jane Austen") ---');
      const booksByAuthor = await getBooksByAuthor('Jane Austen');
      console.log('Books by author:', booksByAuthor);

      console.log('\n--- 4. Testing getBooksByTitle("Things Fall Apart") ---');
      const booksByTitle = await getBooksByTitle('Things Fall Apart');
      console.log('Books by title:', booksByTitle);

      console.log('\nAll Task 11 Axios functions executed successfully!');
    } catch (err) {
      console.error('Test execution error:', err.message);
    }
  })();
}

module.exports = {
  getAllBooks,
  getBookByISBN,
  getBooksByAuthor,
  getBooksByTitle,
};
