import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../actions/cartActions';
import {
  Button,
  Grid,
  CardMedia,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  makeStyles,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

const CartPage = ({ match, history, location }) => {
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  return <div>Hey there!</div>;
};

export default CartPage;
