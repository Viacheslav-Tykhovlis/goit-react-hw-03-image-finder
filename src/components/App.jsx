import React, { Children } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { getImages } from './API/API';

// axios.defaults.baseURL = 'https://pixabay.com/api/';
// const KEY = '30132115-7f2225df990f8cd81354d9436';

export class App extends React.Component {
  state = {
    textInput: '',
    currentImages: [],
    showModal: false,
    largeImage: null,
    loading: false,
    page: 1,
    showLoadMore: true,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.textInput !== this.state.textInput ||
      prevState.page !== this.state.page
    ) {
      this.setState({ loading: true });
      const data = await getImages(this.state.textInput, this.state.page);
      await this.setState({
        currentImages:
          this.state.page === 1
            ? [...data.hits]
            : [...prevState.currentImages, ...data.hits],
        loading: false,
        showLoadMore: this.state.page < Math.ceil(data.totalHits / 12),
      });
    }
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  handleFormSubmit = searchText => {
    this.setState({ textInput: searchText });
  };

  addNewImages = newImages => {
    this.setState({ currentImages: newImages });
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  openModal = largeImage => {
    this.setState({ largeImage });
    this.toggleModal();
  };

  render() {
    const { currentImages, loading, showModal, showLoadMore } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />

        {!currentImages.length > 0 && !loading && (
          <div className="request">Enter a request...</div>
        )}

        <ImageGallery
          sendImages={this.state.currentImages}
          openModal={this.openModal}
        >
          {Children}
        </ImageGallery>

        {loading && <Loader />}
        {currentImages.length > 11 && showLoadMore && (
          <Button loadMore={this.loadMore}></Button>
        )}

        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={this.state.largeImage} alt="" />
          </Modal>
        )}
      </div>
    );
  }
}
