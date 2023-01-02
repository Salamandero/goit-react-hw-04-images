import { Toaster } from 'react-hot-toast';
// toast;
import { Component } from 'react';

import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
// import Modal from './Modal';
import { MainWrapper } from './App.styled';

import { fetchImgGallery } from '../services/api';
class App extends Component {
  state = {
    images: [],
    nameRequest: '',
    // showModal: false,
    page: 1,
    largeImgSrc: '',
    isLoading: false,
    error: null,
  };
  getSearchNameForm = searchName => {
    this.setState({ nameRequest: searchName });
  };
  // async componentDidMount() {
  //   this.setState({ isLoading: true });
  //   try {
  //     const images = await fetchImgGallery(this.state.nameRequest);
  //     this.setState({ images });
  //     console.log(images);
  //   } catch (error) {
  //     this.setState({ error });
  //   } finally {
  //     this.setState({ isLoading: false });
  //   }
  // }
  // async componentDidMount(prevProps, prevSate) {
  //   const prevName = prevProps.nameRequest;
  //   const nextName = this.state.nameRequest;

  //   if (prevName !== nextName) {
  //     this.setState({ isLoading: true, imagesFound: null });
  //     const key_API = '31091511-86aaddbe12333e38c55dc8e63';
  //     const response = await axios.get('https://pixabay.com/api/', {
  //       params: {
  //         key: key_API,
  //         q: nextName,
  //         page: this.state.page,
  //         per_page: 12,
  //         image_type: 'photo',
  //         orientation: 'horizontal',
  //       },
  //     });
  //     this.setState({ images: response.data.hits });

  //   }
  // }
  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.page !== this.state.page ||
      prevState.nameRequest !== this.state.nameRequest
    ) {
      this.setState({ isLoading: true });
      try {
        const images = await fetchImgGallery(this.state.nameRequest);
        this.setState({ images });
        console.log(images);
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
      console.log('Fetch data');
    }
  }
  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { isLoading, nameRequest, images } = this.state;
    return (
      <MainWrapper>
        <div>
          {isLoading && <div>Йде загрузка ... </div>}
          {!nameRequest && <div>Введіть ім'я покемона</div>}
        </div>
        <Searchbar onSubmit={this.getSearchNameForm} />
        {isLoading && <Loader />}
        {/* {isLoading ? <Loader /> : <ImageGallery foundImages={images} />} */}
        {images.length > 0 ? <ImageGallery foundImages={images} /> : null}
        {/* toast.error('Sorry, didn`t find, try again') ) */}
        {/*NO-ANSWER && <Loader /> */}
        {/* {!isLoadImg && <Loader />} 
       
        <ImageGalleryItem />*/}
        {/* {images && <Button loadMore={this.loadMore} />} */}
        {/* <Modal /> */}
        <Toaster position="top-right" reverseOrder={false} />
      </MainWrapper>
    );
  }
}

export default App;
