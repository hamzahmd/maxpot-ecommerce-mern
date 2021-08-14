import React, { Fragment } from 'react';
import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import { Typography, Box, Container } from '@material-ui/core';

function App() {
  return (
    <Fragment>
      <Typography>
        <Header />
        <main>
          <Container>
            <Box Container my='0.5rem'>
              <h1>Maxpot</h1>
            </Box>
          </Container>
        </main>
        <Footer />
      </Typography>
    </Fragment>
  );
}

export default App;
