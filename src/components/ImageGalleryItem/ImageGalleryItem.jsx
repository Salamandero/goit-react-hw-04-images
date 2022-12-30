// import PropTypes from "prop-types";
import { Component } from 'react';
import Modal from 'components/Modal';
import { ImgGalleryItem, ImgGalleryItemImg } from './ImageGalleryItem.styled';

class ImageGalleryItem extends Component {
  state = {
    isOpenModal: false,
    // showModal: false,
  };
  toggleModal = () => {
    this.setState(({ isOpenModal }) => ({
      isOpenModal: !isOpenModal,
    }));
  };
  openModal = event => {
    event.preventDefault(); //pererobu umovy moze des nepravylno
    if (event.target.elements === event.currentTarget.elements) {
      this.setState({ isOpenModal: true });
    }
  };
  closeModal = () => {
    this.setState({ isOpenModal: false });
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
