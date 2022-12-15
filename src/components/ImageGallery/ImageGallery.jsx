import React from 'react';
import { Loader } from '../Loader/Loader';
import { Button } from '../Button/Button';
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
    activeImage: 0,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.textSearch !== this.props.textSearch ||
      prevState.page !== this.state.page
    ) {
      this.setState({ loading: true });
      const { data } = await axios.get(
        `?q=${this.props.textSearch}&page=${this.state.page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
      );

      this.setState({
        images: data,
        loading: false,
      });
      this.props.getImages(this.state.images.hits);
    }
  }

  getURL = url => {
    this.props.openModal(url);
  };

  loadMore = () => {
    console.log('саботало');
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { loading, images } = this.state;

    return (
      <>
        {/* {!images.hits === undefined && <div>ничего нет</div>} */}
        {this.state.loading && <Loader className={css.loader} />}
        {!images.hits && !loading && (
          <div className={css.request}>Enter a request...</div>
        )}
        <ul className={css.imageGallery}>
          <ImageGalleryItem
            sendImages={images.hits}
            openModal={this.getURL}
          ></ImageGalleryItem>
        </ul>
        {images.hits && <Button loadMore={this.loadMore}></Button>}
      </>
    );
  }
}
