import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { Container } from '@material-ui/core';

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Container>
          <Route path='/login' component={LoginPage} />
          <Route path='/register' component={RegisterPage} />
          <Route path='/product/:id' component={ProductPage} />
          <Route path='/cart/:id?' component={CartPage} />
          <Route path='/' component={HomePage} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
