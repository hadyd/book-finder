import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { BiBookAlt } from 'react-icons/bi';
import { MdFavorite } from 'react-icons/md';
import { BookList, Header, Search, Wishlist } from '../../components';
import {
  getBookList,
  reset,
  addToWishlist,
  deleteFromWishlist,
} from '../../actions/bookActions';
import styles from './Home.module.css';

const Home = () => {
  const [searchKey, setSearchKey] = useState('Kahlil Gibran');
  const [startIndex, setStartIndex] = useState(0);
  const [keyTab, setKeyTab] = useState('books-list');
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

  const handleLoadMore = () => {
    setStartIndex(bookListResultAllData.length);
  };

  useEffect(() => {
    if (searchKey) {
      dispatch(getBookList(searchKey, startIndex));
    }
  }, [dispatch, searchKey, startIndex]);

  return (
    <>
      <Container>
        <Header title="book finder" />
        {keyTab === 'books-list' && <Search onKeyPress={handleSearch} />}
        <div className={styles['list-wrapper']}>
          <Tabs activeKey={keyTab} onSelect={(k) => setKeyTab(k)}>
            <Tab
              eventKey="books-list"
              title={<BiBookAlt className={styles.icon} />}
              className={styles.tab}
            >
              <BookList
                data={bookListResultAllData}
                loading={bookListLoading}
                error={bookListError}
                handleLoadMore={handleLoadMore}
                addToWishlist={addToWishlist}
                keyTab={keyTab}
                deleteFromWishlist={deleteFromWishlist}
              />
            </Tab>
            <Tab
              eventKey="wishlist"
              title={<MdFavorite className={styles.icon} />}
            >
              <Wishlist
                data={bookListResultWishlist}
                keyTab={keyTab}
                deleteFromWishlist={deleteFromWishlist}
              />
            </Tab>
          </Tabs>
        </div>
      </Container>
    </>
  );
};

export default Home;
