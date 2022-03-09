import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import ReactStars from 'react-stars';
import { FaTrashAlt } from 'react-icons/fa';
import { MdFavorite } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import styles from './BookList.module.css';

const BookList = ({
  data,
  loading,
  error,
  handleLoadMore,
  addToWishlist,
  keyTab,
  deleteFromWishlist,
}) => {
  const dispatch = useDispatch();
  return (
    <div className={styles['book-list-wrapper']}>
      <Row className={styles['item-wrapper']}>
        {data?.length > 0 ? (
          data.map((book, index) => {
            return (
              <Card className={styles.card} border="light" key={index}>
                <Row>
                  <Col xs lg="4">
                    <Card.Img
                      variant="top"
                      src={book.volumeInfo.imageLinks?.thumbnail}
                      className={styles.thumbnail}
                    />
                  </Col>
                  <Col>
                    <Card.Body>
                      <h6>{book.volumeInfo.title}</h6>
                      <ReactStars
                        count={5}
                        size={24}
                        color2={'#ffd700'}
                        edit={false}
                        value={book.volumeInfo.averageRating}
                      />
                      <Card.Text>
                        Author: {''}
                        {book.volumeInfo.authors?.map((name, index) => (
                          <span key={index}>
                            {name}
                            {index < book.volumeInfo.authors.length - 1
                              ? ', '
                              : ''}
                          </span>
                        )) || '-'}
                      </Card.Text>
                    </Card.Body>
                  </Col>
                </Row>
                <div className={styles['wishlist-wrapper']}>
                  {!book.isWishlist ? (
                    <Button
                      onClick={() => dispatch(addToWishlist(index, book))}
                      variant="outline-secondary"
                    >
                      Add To Wishlist <MdFavorite />
                    </Button>
                  ) : (
                    <Button
                      onClick={() => dispatch(deleteFromWishlist(index, book))}
                      variant="danger"
                    >
                      Remove Wishlist <FaTrashAlt />
                    </Button>
                  )}
                </div>
              </Card>
            );
          })
        ) : loading ? (
          <div className={styles['empty-wrapper']}>
            <Spinner animation="grow" variant="secondary" />
          </div>
        ) : (
          <div className={styles['empty-wrapper']}>
            <span>{error ? error : 'Empty'}</span>
          </div>
        )}
        <div className={styles['loadmore-wrapper']}>
          {data?.length && keyTab === 'books-list' ? (
            <Button onClick={handleLoadMore} variant="secondary">
              Load More
              {loading && (
                <Spinner
                  animation="border"
                  size="sm"
                  variant="light"
                  className={styles.spinner}
                />
              )}
            </Button>
          ) : null}
        </div>
      </Row>
    </div>
  );
};

export default BookList;
