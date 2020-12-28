import './App.css';
import React, { Component } from 'react';
import { getAll } from './BooksAPI';

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
        <ul>
          {this.state.books.map((book) => (
            <li key={book.id}>{book.title}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
