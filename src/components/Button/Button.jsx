import React from 'react';
import css from './Button.module.css';

export const Button = () => {
  return (
    <button
      type="button"
      className={css.button}
      onClick={() => {
        this.props.loadMore();
      }}
    >
      Load more
    </button>
  );
};
