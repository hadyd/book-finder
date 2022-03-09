import React, { useState, useEffect } from 'react';
import { Header, Search } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { getBookList, reset } from '../../actions/bookActions';

const Home = () => {
  const [searchKey, setSearchKey] = useState('Pramoedya Ananta Toer');
  const [startIndex, setStartIndex] = useState(0);
  const {
    bookListResultAllData,
    bookListResultWishlist,
    bookListLoading,
    bookListError,
  } = useSelector((state) => state.BookReducer);
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    if (e.charCode === 13) {
      setSearchKey(e.target.value);
      setStartIndex(0);
      dispatch(reset());
    }
  };

  useEffect(() => {
    if (searchKey) {
      dispatch(getBookList(searchKey, startIndex));
    }
  }, [dispatch, searchKey, startIndex]);

  console.log(bookListResultAllData, 'all data');
  console.log(bookListResultWishlist, 'wishlist data');
  console.log(bookListLoading, 'loading');
  console.log(bookListError, 'error');

  return (
    <>
      <Header title="Book Finder" />
      <Search onKeyPress={handleSearch} />
    </>
  );
};

export default Home;
