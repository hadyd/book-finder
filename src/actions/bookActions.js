import axios from 'axios';
import { BASE_URL } from '../utils';

export const GET_BOOK_LIST = 'GET_BOOK_LIST';
export const RESET = 'RESET';

export const getBookList = (searchKey, startIndex) => {
  return (dispatch) => {
    dispatch({
      type: GET_BOOK_LIST,
      payload: {
        loading: true,
        errorMessage: false,
        bookListAllData: [],
        bookListWishlist: [],
      },
    });

    axios({
      method: 'GET',
      url: BASE_URL,
      params: {
        q: searchKey,
        maxResults: 6,
        startIndex: startIndex,
      },
    })
      .then((response) => {
        let dataBooks = response.data.items.map((i) => ({
          ...i,
          isWishlist: false,
        }));

        let bookListAllData = [];
        let bookListWishlist = [];

        dataBooks.forEach((item) => {
          if (item.isWishlist) {
            bookListWishlist.push(item);
          } else {
            bookListAllData.push(item);
          }
        });
        dispatch({
          type: GET_BOOK_LIST,
          payload: {
            loading: false,
            errorMessage: false,
            bookListAllData: bookListAllData,
            bookListWishlist: bookListWishlist,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_BOOK_LIST,
          payload: {
            loading: false,
            bookListAllData: [],
            bookListWishlist: [],
            errorMessage: error.message,
          },
        });
      });
  };
};

export const reset = () => {
  return async (dispatch) => {
    dispatch({
      type: RESET,
    });
  };
};