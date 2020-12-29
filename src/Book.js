import PropTypes from 'prop-types';
import React, { Component } from 'react';
class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shelf: props.book.shelf ? props.book.shelf : 'none',
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
      { value: 'currentlyReading', label: 'Currently Reading' },
      { value: 'wantToRead', label: 'Want to Read' },
      { value: 'read', label: 'Read' },
      { value: 'none', label: 'None' },
    ];
    return (
      <div className="book">
        <div className="book-thumbnail">
          <a target="_blank" href={book.infoLink} rel="noreferrer">
            <img
              src={
                book.imageLinks
                  ? book.imageLinks.thumbnail
                  : './images/no_image.png'
              }
              alt=""
            />
          </a>
          <div className="book-select">
            <select value={this.state.shelf} onChange={this.handleChange}>
              <option disabled>Select</option>
              {options.map((option) => (
                <option value={option.value} key={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <p className="book-title">{book.title}</p>
        <span className="book-author">{book.authors}</span>
      </div>
    );
  }
}

Book.propsType = {
  book: PropTypes.object,
  onChangeShelf: PropTypes.func,
};

export default Book;
