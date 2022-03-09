import {
  GET_BOOK_LIST,
  RESET,
  ADD_TO_WISHLIST,
  DELETE_FROM_WISHLIST,
} from '../../actions/bookActions';

const initialState = {
  bookListResultAllData: [],
  bookListResultWishlist: [],
  bookListLoading: false,
  bookListError: false,
};

const book = (state = initialState, action) => {
  switch (action.type) {
    case GET_BOOK_LIST:
      return {
        ...state,
        bookListResultAllData: [
          ...state.bookListResultAllData,
          ...action.payload.bookListAllData,
        ],
        bookListResultWishlist: [
          ...state.bookListResultWishlist,
          ...action.payload.bookListWishlist,
        ],
        bookListLoading: action.payload.loading,
        bookListError: action.payload.errorMessage,
      };

    case RESET:
      return {
        ...state,
        bookListResultAllData: [],
        bookListResultWishlist: [],
      };

    case ADD_TO_WISHLIST:
      return {
        ...state,
        bookListResultAllData: Object.values({
          ...state.bookListResultAllData,
          [action.payload.index]: action.payload.data,
        }),

        bookListResultWishlist: [action.payload.data].concat(
          state.bookListResultWishlist
        ),
      };

    case DELETE_FROM_WISHLIST:
      let newBook = { ...action.payload.data, isWishlist: false };
      return {
        ...state,
        bookListResultWishlist: state.bookListResultWishlist.filter(
          (w) => w !== action.payload.data
        ),
        bookListResultAllData: state.bookListResultAllData.map((book) =>
          book.id === action.payload.data.id ? newBook : book
        ),
      };
    default:
      return state;
  }
};

export default book;
