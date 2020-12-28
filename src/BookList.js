import { bool } from 'prop-types';
import React, { Component } from 'react';
import Book from './Book';

export default class BookList extends Component {
  render() {
    const { heading, books } = this.props;
    return (
      <div>
        <h2>{heading}</h2>
        {books ? (
          <ul>
            {books.map((book) => (
              <Book book={book} key={book.id} />
            ))}
          </ul>
        ) : (
          <p>No data...</p>
        )}
      </div>
    );
  }
}
