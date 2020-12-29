import React, { Component } from 'react';
import { getAll, update } from './BooksAPI';
import BookList from './BookList';
import { Link } from 'react-router-dom';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
    };
  }

  async componentDidMount() {
    const books = await getAll();
    console.log(books);
    this.setState({
      books,
    });
  }

  updateShelf = async ({ book, shelf }) => {
    const res = await update(book, shelf);
    console.log(res);
    this.setState((currentState) => {
      const newBooks = currentState.books.map((currentBook) => {
        if (currentBook.id === book.id) {
          currentBook.shelf = shelf;
        }
        return currentBook;
      });
      console.log(newBooks);
      return {
        books: newBooks,
      };
    });
  };

  render() {
    return (
      <div>
        <header className="header-home">
          <h1>My Reads</h1>
        </header>
        <main className="container">
          <BookList
            heading="Currently Reading"
            books={this.state.books.filter(
              (book) => book.shelf === 'currentlyReading'
            )}
            onUpdateShelf={this.updateShelf}
          />
          <BookList
            heading="Want to Read"
            books={this.state.books.filter(
              (book) => book.shelf === 'wantToRead'
            )}
            onUpdateShelf={this.updateShelf}
          />
          <BookList
            heading="Read"
            books={this.state.books.filter((book) => book.shelf === 'read')}
            onUpdateShelf={this.updateShelf}
          />
        </main>
        <Link to="/search">
          <button className="floating-action-button">+</button>
        </Link>
      </div>
    );
  }
}

export default Home;
