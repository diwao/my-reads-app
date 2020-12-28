import React, { Component } from 'react';
import { getAll } from './BooksAPI';
import BookList from './BookList';
import { Link } from 'react-router-dom';

export default class Home extends Component {
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

  updateShelf = ({ book, shelf }) => {
    console.log(book);
    console.log(shelf);
  };

  render() {
    return (
      <div>
        <header>My Reads</header>
        <BookList
          heading="Current Reading"
          books={this.state.books}
          onUpdateShelf={this.updateShelf}
        />
        <Link to="/search">
          <button>+</button>
        </Link>
      </div>
    );
  }
}
