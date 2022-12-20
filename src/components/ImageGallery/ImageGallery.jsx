import React from 'react';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export class ImageGallery extends React.Component {
  getURL = url => {
    this.props.openModal(url);
  };

  render() {
    return (
      <ul className={css.imageGallery}>
        <ImageGalleryItem
          sendImages={this.props.sendImages}
          openModal={this.getURL}
        ></ImageGalleryItem>
      </ul>
    );
  }
}
