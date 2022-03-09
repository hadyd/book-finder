import React from 'react';
import BookList from '../BookList';

const Wishlist = ({ data, keyTab, deleteFromWishlist }) => {
  return (
    <BookList
      data={data}
      keyTab={keyTab}
      deleteFromWishlist={deleteFromWishlist}
    />
  );
};

export default Wishlist;
