import ImageGalleryItem from '../ImageGalleryItem';
import { ImageGalleryList } from './ImageGallery.styled';

const ImageGallery = ({ foundImages }) => {
  return (
    <ImageGalleryList>
      {foundImages.map(({ id, webformatURL, tags }) => (
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          // largeImageURL={largeImageURL}
          tags={tags}
        />
      ))}
    </ImageGalleryList>
  );
};

export default ImageGallery;
