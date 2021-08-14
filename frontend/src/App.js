import React, { Fragment } from 'react';
import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import HomePage from './pages/HomePage';
import { Typography, Container } from '@material-ui/core';

function App() {
  return (
    <Fragment>
      <Typography>
        <Header />
        <main>
          <Container justifyContent='center'>
            <HomePage />
          </Container>
        </main>
        <Footer />
      </Typography>
    </Fragment>
  );
}

export default App;
