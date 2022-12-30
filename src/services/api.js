import axios from 'axios';

const key_API = '31091511-86aaddbe12333e38c55dc8e63';

const fetchImgGallery = async nameRequest => {
  const response = await axios.get('https://pixabay.com/api/', {
    params: {
      key: key_API,
      q: nameRequest,
      page: 1,
      per_page: 12,
      image_type: 'photo',
      orientation: 'horizontal',
    },
  });
  return response.data.hits;
};

export { fetchImgGallery };
