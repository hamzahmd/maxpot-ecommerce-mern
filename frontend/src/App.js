import React, { Fragment } from 'react';
import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Fragment>
      <Header />
      <main>
        <HomePage />
      </main>
      <Footer />
    </Fragment>
  );
}

export default App;
