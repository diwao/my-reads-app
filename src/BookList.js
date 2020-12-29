import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Book from './Book';

class BookList extends Component {
  handleChangeShelf = (payload) => {
    this.props.onUpdateShelf(payload);
  };

  render() {
    const { heading, books } = this.props;
    return (
      <div className="book-list">
        <h2 className="book-list-heading">{heading}</h2>
        {books ? (
          <ul className="books">
            {books.map((book) => (
              <Book
                book={book}
                key={book.id}
                onChangeShelf={this.handleChangeShelf}
              />
            ))}
          </ul>
        ) : (
          <p>No data...</p>
        )}
      </div>
    );
  }
}

BookList.propsType = {
  heading: PropTypes.string,
  books: PropTypes.array,
};

export default BookList;
