import React from 'react';
import BookList from '../BookList';

const Wishlist = ({ data, keyTab }) => {
  return <BookList data={data} keyTab={keyTab} />;
};

export default Wishlist;
