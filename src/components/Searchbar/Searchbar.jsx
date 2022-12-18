import React from 'react';
import { BsSearch } from 'react-icons/bs';
import css from './Searchbar.module.css';

export class Searchbar extends React.Component {
  state = {
    inputText: '',
  };

  handleInput = evt => {
    this.setState({ inputText: evt.currentTarget.value.toLowerCase() });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    if (this.state.inputText.trim() === '') {
      alert('Будь-ласка, заповніть поле пошуку');
      return;
    }

    this.props.onSubmit(this.state.inputText);
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.searchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.searchFormButton}>
            <BsSearch size={25} />
            <span className={css.searchFormButtonLabel}>Search</span>
          </button>

          <input
            className={css.searchFormInput}
            type="text"
            value={this.state.inputText}
            placeholder="Search images and photos"
            onChange={this.handleInput}
          />
        </form>
      </header>
    );
  }
}
