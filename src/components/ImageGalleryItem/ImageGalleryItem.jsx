// import PropTypes from "prop-types";
import { Component } from 'react';
import Modal from 'components/Modal';
import { ImgGalleryItem, ImgGalleryItemImg } from './ImageGalleryItem.styled';

class ImageGalleryItem extends Component {
  state = {
    isOpenModal: false,
  };
  toggleModal = () => {
    this.setState(({ isOpenModal }) => ({
      isOpenModal: !isOpenModal,
    }));
  };

  render() {
    // const isOpenModal = this.state;
    const { webformatURL, tags, largeImageURL } = this.props;
    return (
      <ImgGalleryItem>
        <ImgGalleryItemImg
          src={webformatURL}
          alt={tags}
          onClick={this.toggleModal}
        />
        {this.state.isOpenModal && (
          <Modal
            tags={tags}
            largeImageURL={largeImageURL}
            onClose={this.toggleModal}
          />
        )}
      </ImgGalleryItem>
    );
  }
}

export default ImageGalleryItem;
