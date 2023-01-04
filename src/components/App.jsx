import toast, { Toaster } from 'react-hot-toast';

import { Component } from 'react';

import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Button from './Button/Button';
import PropTypes from 'prop-types';
import { MainWrapper } from './App.styled';

import { fetchImgGallery } from '../services/api';
class App extends Component {
  state = {
    images: [],
    nameRequest: '',
    page: 1,
    isLoading: false,
    error: null,
    totalHits: null,
  };
  static propTypes = {
    images: PropTypes.array,
    nameRequest: PropTypes.string,
    page: PropTypes.number,
    isLoading: PropTypes.bool,
    error: PropTypes.string,
    totalHits: PropTypes.number,
    getSearchNameForm: PropTypes.func,
    loadMore: PropTypes.func,
    ShowBtnLoadMore: PropTypes.number,
  };
  getSearchNameForm = searchName => {
    this.setState({
      nameRequest: searchName,
      page: 1,
      images: [],
      totalHits: null,
    });
  };

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
        if (images.totalHits === 0) {
          return toast.error('Sorry, didn`t find, try another');
        }
        if (this.state.page >= 2) {
          return this.setState({
            images: [...prevState.images, ...images.hits],
            totalHits: images.totalHits,
          });
        }

        this.setState({
          images: images.hits,
          totalHits: images.totalHits,
        });
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }
  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      // images: [...prevState.images, ...this.state.images],
    }));
  };

  render() {
    const { isLoading, images, totalHits, page } = this.state;
    const ShowBtnLoadMore = totalHits - page * 12;

    return (
      <MainWrapper>
        <Searchbar onSubmit={this.getSearchNameForm} />
        {/* <div>{isLoading && <div>Please wait... </div>}</div> */}

        {totalHits > 0 ? <ImageGallery foundImages={images} /> : null}

        {isLoading && <Loader />}
        {ShowBtnLoadMore > 0 && <Button loadMore={this.loadMore} />}
        <Toaster position="top-right" reverseOrder={false} />
      </MainWrapper>
    );
  }
}

export default App;
