import React, { Children } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';

export class App extends React.Component {
  state = {
    textInput: '',
    currentImages: [],
    showModal: false,
    largeImage: null,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  handleFormSubmit = searchText => {
    this.setState({ textInput: searchText });
  };

  addNewImages = newImages => {
    this.setState({ currentImages: newImages });
  };

  openModal = largeImage => {
    this.setState({ largeImage });
    this.toggleModal();
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />

        <ImageGallery
          textSearch={this.state.textInput}
          getImages={this.addNewImages}
          openModal={this.openModal}
        >
          {Children}
        </ImageGallery>

        {this.state.showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={this.state.largeImage} alt="" />
          </Modal>
        )}
      </div>
    );
  }
}
