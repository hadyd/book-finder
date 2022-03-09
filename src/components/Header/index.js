import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { ImBook } from 'react-icons/im';
import styles from './Header.module.css';

const Header = ({ title }) => {
  return (
    <>
      <Navbar bg="light">
        <Container className="d-flex justify-content-center mt-3">
          <Navbar.Brand className="text-muted">
            <h1 className={styles.title}>
              {title} <ImBook />
            </h1>
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
