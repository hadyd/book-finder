import React from 'react';
import Form from 'react-bootstrap/Form';
import styles from './Search.module.css';

const Search = ({ onKeyPress }) => {
  return (
    <div className={styles['search-wrapper']}>
      <div className={styles['form-wrapper']}>
        <Form.Control
          size="lg"
          type="text"
          placeholder="Search"
          onKeyPress={onKeyPress}
          className={styles['input-search']}
        />
      </div>
    </div>
  );
};

export default Search;
