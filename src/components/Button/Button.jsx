import { LoadMoreBtn } from './Button.styled';

const Button = ({ loadMore }) => {
  return (
    <>
      <LoadMoreBtn onClick={() => loadMore()}>Load more</LoadMoreBtn>
    </>
  );
};
export default Button;
