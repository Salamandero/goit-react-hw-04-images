import { Component } from 'react';
import { ImSearch } from 'react-icons/im';
import toast from 'react-hot-toast';
import {
  HeaderSearch,
  SearchForm,
  SearchFormBtn,
  SearchFormBtnLabel,
  SearchFormInput,
} from './Searchbar.styled';
// import {ReactComponent as MyIcon} from

class Searchbar extends Component {
  state = {
    searchName: '',
  };
  handleFormChange = event => {
    this.setState({ searchName: event.currentTarget.value.toLowerCase() });
  };
  handleSubmit = event => {
    event.preventDefault();

    if (this.state.searchName.trim() === '') {
      return toast.error('Write name pokemon');
    }
    this.props.onSubmit(this.state.searchName);
    this.setState({ searchName: '' });
  };

  render() {
    const searchName = this.state.searchName;
    return (
      <HeaderSearch>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormBtn type="submit">
            <ImSearch />
            <SearchFormBtnLabel>Search</SearchFormBtnLabel>
          </SearchFormBtn>

          <SearchFormInput
            type="text"
            name="searchName"
            value={searchName}
            onChange={this.handleFormChange}
            // autocomplete="off"
            // autofocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </HeaderSearch>
    );
  }
}

export default Searchbar;
