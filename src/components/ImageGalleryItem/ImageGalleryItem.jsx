import React from 'react';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ sendImages, openModal }) => {
  if (sendImages) {
    return sendImages.map(image => {
      return (
        <li className={css.imageGalleryItem} key={image.id}>
          <img
            className={css.imageGalleryItemImage}
            src={image.webformatURL}
            alt={image.tags}
            onClick={() => {
              openModal(image.largeImageURL);
            }}
          />
        </li>
      );
    });
  }
};
