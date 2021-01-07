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
    const shelves = {
      currentlyReading: ['Currently Reading', 'currentlyReading'],
      wantToRead: ['Want to Read', 'wantToRead'],
      read: ['Read', 'read'],
    };

    const books = [];
    for (const key in shelves) {
      books.push(
        <BookList
          heading={shelves[key][0]}
          books={this.state.books.filter(
            (book) => book.shelf === shelves[key][1]
          )}
          onUpdateShelf={this.updateShelf}
          key={shelves[key]}
        />
      );
    }

    return (
      <div>
        <header className="header-home">
          <h1>My Reads</h1>
        </header>
        <main className="container">{books}</main>
        <Link to="/search">
          <button className="floating-action-button">+</button>
        </Link>
      </div>
    );
  }
}

export default Home;
