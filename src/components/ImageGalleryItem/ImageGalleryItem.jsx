// import PropTypes from "prop-types";
import { Component } from 'react';
import { ImgGalleryItem, ImgGalleryItemImg } from './ImageGalleryItem.styled';

class ImageGalleryItem extends Component {
  state = {
    isOpenModal: false,
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
    const { webformatURL, tags } = this.props;
    return (
      <ImgGalleryItem>
        <ImgGalleryItemImg src={webformatURL} alt={tags} />
      </ImgGalleryItem>
    );
  }
}

export default ImageGalleryItem;
