import React from 'react';
import { Button } from '../Button/Button';
import { Loader } from '../Loader/Loader';
import axios from 'axios';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY = '30132115-7f2225df990f8cd81354d9436';

export class ImageGallery extends React.Component {
  state = {
    page: 1,
    images: [],
    loading: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.textSearch !== this.props.textSearch) {
      await this.setState({ loading: true, page: 1, images: [] });
      const { data } = await axios.get(
        `?q=${this.props.textSearch}&page=${this.state.page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
      );
      await this.setState({
        images: data.hits,
        loading: false,
      });
    }

    if (prevState.page !== this.state.page && this.state.page !== 1) {
      this.setState({ loading: true });
      const { data } = await axios.get(
        `?q=${this.props.textSearch}&page=${this.state.page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
      );
      this.setState(prevState => ({
        images:
          prevState.images.length > 0
            ? [...prevState.images, ...data.hits]
            : data.hits,
        loading: false,
      }));
    }

    if (prevState.images !== this.state.images) {
      this.props.getImages(this.state.images);
    }
  }

  getURL = url => {
    this.props.openModal(url);
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { loading, images } = this.state;
    return (
      <>
        {!images.length > 0 && !loading && (
          <div className={css.request}>Enter a request...</div>
        )}
        <ul className={css.imageGallery}>
          <ImageGalleryItem
            sendImages={images}
            openModal={this.getURL}
          ></ImageGalleryItem>
        </ul>
        {this.state.loading && <Loader />}
        {images.length > 0 && <Button loadMore={this.loadMore}></Button>}
      </>
    );
  }
}
