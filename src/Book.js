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
    console.log(e.target.value);
    this.setState({
      shelf: e.target.value,
    });
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
      <div>
        {book.title}: {book.id}
        <select value={this.state.shelf} onChange={this.handleChange}>
          <option disabled>Select</option>
          {options.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
}
