import React, { Component } from 'react';
import { search, update, getAll } from './BooksAPI';
import { Link } from 'react-router-dom';
import Book from './Book';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      searchedBooks: [],
      books: [],
    };
  }

  async componentDidMount() {
    const books = await getAll();
    this.setState({
      books,
    });
  }

  handleInput = (e) => {
    this.setState({
      query: e.target.value,
    });
  };

  handleSearch = async (e) => {
    e.preventDefault();
    if (this.state.query === '') {
      alert('Please input any queries.');
      return;
    }
    const searchedBooks = await search(this.state.query);
    if (searchedBooks.error) {
      alert('Invalid queries.');
      return;
    }
    console.log(searchedBooks);
    this.setState({
      searchedBooks: searchedBooks.map((searchedBook) => {
        this.state.books.forEach((book) => {
          if (book.id === searchedBook.id) {
            searchedBook.shelf = book.shelf;
            return;
          }
        });
        return searchedBook;
      }),
    });
    console.log(searchedBooks);
  };

  updateShelf = async ({ book, shelf }) => {
    const res = await update(book, shelf);
    console.log(res);
  };

  render() {
    return (
      <div>
        <header className="header-search">
          <Link to="/">
            <button className="back-to-home">Back</button>
          </Link>
          <form onSubmit={this.handleSearch} className="search-form">
            <input
              onChange={this.handleInput}
              value={this.state.query}
              placeholder="Input any queries and hit the enter key."
              className="search-input"
            />
          </form>
        </header>
        <main className="container">
          <ul className="books">
            {this.state.searchedBooks.map((book) => (
              <Book
                book={book}
                key={book.id}
                onChangeShelf={this.updateShelf}
              />
            ))}
          </ul>
        </main>
      </div>
    );
  }
}
