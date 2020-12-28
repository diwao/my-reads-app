import './App.css';
import React, { Component } from 'react';
import { getAll } from './BooksAPI';
import BookList from './BookList';

class App extends Component {
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

  render() {
    return (
      <div>
        <BookList heading="Current Reading" books={this.state.books} />
      </div>
    );
  }
}

export default App;
