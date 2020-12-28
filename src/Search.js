import React, { Component } from 'react';
import { search } from './BooksAPI';
import { Link } from 'react-router-dom';
import Book from './Book';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      books: [],
    };
  }

  handleInput = (e) => {
    this.setState({
      keyword: e.target.value,
    });
  };

  handleSearch = async (e) => {
    e.preventDefault();
    const books = await search(this.state.keyword);
    this.setState({
      books,
    });
    console.log(books);
  };

  updateShelf = ({ book, shelf }) => {
    console.log(book);
    console.log(shelf);
  };

  render() {
    return (
      <div>
        <header>
          <Link to="/">
            <button>Back</button>
          </Link>
          <form onSubmit={this.handleSearch}>
            <input onChange={this.handleInput} value={this.state.keyword} />
          </form>
        </header>
        <main>
          <ul className="books">
            {this.state.books.map((book) => (
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
