import { GET_BOOK_LIST, RESET } from '../../actions/bookActions';

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

    default:
      return state;
  }
};

export default book;
