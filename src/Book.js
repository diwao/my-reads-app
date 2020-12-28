import { bool } from 'prop-types';
import React, { Component } from 'react';

export default class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shelf: props.book.shelf,
    };
  }

  handleChange = (e) => {
    const shelf = e.target.value;
    this.setState({
      shelf,
    });
    this.props.onChangeShelf({ book: this.props.book, shelf });
  };

  render() {
    const { book } = this.props;
    const options = [
      { value: 'currentlyReading', label: 'current' },
      { value: 'wantToRead', label: 'Want to Read' },
      { value: 'read', label: 'Read' },
      { value: 'none', label: 'None' },
    ];
    return (
      <div className="book">
        <div className="book-thumbnail">
          <img src={book.imageLinks.thumbnail} alt="" />
          <select
            value={this.state.shelf}
            onChange={this.handleChange}
            className="book-select"
          >
            <option disabled>Select</option>
            {options.map((option) => (
              <option value={option.value} key={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <p>{book.title}</p>
        <span>{book.authors}</span>
      </div>
    );
  }
}
