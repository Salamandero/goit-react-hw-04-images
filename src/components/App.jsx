import { Toaster } from 'react-hot-toast';
import { Component } from 'react';

import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
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
  async componentDidMount() {
    this.setState({ isLoading: true });
    try {
      const images = await fetchImgGallery(this.state.nameRequest);
      this.setState({ images });
      // console.log(images);
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  }
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

  // .then(response => this.setState({ imagesFound: response.data.hits[0] }))
  // .then(response => {
  //   if (response.ok) {
  //     return response.json();
  //   }
  //   return Promise.reject(
  //     new Error(`Don't find you request ${nextName} Bugaga`)
  //   );
  // })
  // .catch(error => this.setState({ error }))
  // .finally(() => {
  //   this.setState({ isLoading: false });
  // });
  //   }
  // }
  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };
  // componentDidUpdate(prevProps, prevState) {
  //if(prevState.page !== this.state.page ||
  // prevState.nameRequest !== this.state.nameRequest)
  // {console.log("Fetch data");}
  // }
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
        {images.length > 0 ? <ImageGallery foundImages={images} /> : null}

        {/*NO-ANSWER && <Loader /> */}
        {/* {!isLoadImg && <Loader />} 
       
        <ImageGalleryItem />*/}

        {/* {Images && <Button loadMore={this.loadMore} />} */}
        {/* <Modal /> */}
        <Toaster position="top-right" reverseOrder={false} />
      </MainWrapper>
    );
  }
}

export default App;
