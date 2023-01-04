import toast, { Toaster } from 'react-hot-toast';
// toast;
import { Component } from 'react';

import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
// import Modal from './Modal';
import Button from './Button/Button';
import { MainWrapper } from './App.styled';

import { fetchImgGallery } from '../services/api';
class App extends Component {
  state = {
    images: [],
    nameRequest: '',
    page: 1,
    largeImgSrc: '',
    isLoading: false,
    error: null,
    totalHits: null,
  };
  getSearchNameForm = searchName => {
    this.setState({
      nameRequest: searchName,
      page: 1,
      images: [],
      totalHits: null,
    });
  };

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

  async componentDidUpdate(_, prevState) {
    if (
      prevState.page !== this.state.page ||
      prevState.nameRequest !== this.state.nameRequest
    ) {
      this.setState({ isLoading: true });
      try {
        const images = await fetchImgGallery(
          this.state.nameRequest,
          this.state.page
        );
        // this.setState(prevState => ({ images: [...prevState.images, images] }));
        // добавление фото
        this.setState({
          // images: [...prevState.images, ...images.hits],
          images: images.hits,
          totalHits: images.totalHits,
        });
        // if (this.state.page >= 2) {
        //   this.setState({
        //     images: [...prevState.images, ...this.state.images],
        //   });
        // }
        // console.log({ ...prevState.images, ...images.hits });
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
    }
    // if (this.state.page >= 2) {
    //   prevImages = prevState.images;
    //   this.setState({
    //     images: [...prevState.images, ...this.state.images],
    //   });
    // }

    // if (this.state.images.length === 0 && this.state.nameRequest.length > 0) {
    //   toast.error('Sorry, don`t find, try again');
    // }
  }
  loadMore = () => {
    // this.setState(prevState => ({ page: prevState.page + 1 }));
    this.setState(prevState => ({
      page: prevState.page + 1,
      images: [...prevState.images, ...this.state.images],
    }));
  };

  render() {
    const { isLoading, images, totalHits, page } = this.state;
    const ShowBtnLoadMore = totalHits - page * 12;

    return (
      <MainWrapper>
        <Searchbar onSubmit={this.getSearchNameForm} />
        <div>
          {isLoading && <div>Please wait... </div>}
          {/* {!nameRequest && <div>Введіть ім'я </div>} */}
        </div>

        {totalHits > 0 ? <ImageGallery foundImages={images} /> : null}
        {totalHits === 0 && toast.error('Sorry, don`t find, try again')}
        {/* toast.error('Sorry, don`t find, try again') ) */}
        {/*NO-ANSWER && <Loader /> */}

        {isLoading && <Loader />}
        {ShowBtnLoadMore > 0 && <Button loadMore={this.loadMore} />}
        {/* <Modal /> */}
        <Toaster position="top-right" reverseOrder={false} />
      </MainWrapper>
    );
  }
}

export default App;
