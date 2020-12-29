import React, { Component } from 'react';
import { search, update, getAll } from './BooksAPI';
import { Link } from 'react-router-dom';
import Book from './Book';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
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
      keyword: e.target.value,
    });
  };

  handleSearch = async (e) => {
    e.preventDefault();
    const searchedBooks = await search(this.state.keyword);
    if (searchedBooks.error) {
      alert('No result');
      return;
    }
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
              value={this.state.keyword}
              placeholder="Input and enter keyword"
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
