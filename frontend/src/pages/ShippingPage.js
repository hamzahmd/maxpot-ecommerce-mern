import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../Components/CheckoutSteps';
import {
  Button,
  Card,
  Box,
  TextField,
  Container,
  makeStyles,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '0.9rem',
  },
  alertM: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  loadBox: {
    display: 'flex',
    justifyContent: 'center',
  },
  submitBtn: {
    margin: theme.spacing(3, 0, 2),
    color: '#f4f4f4',
    background: '#1B4E59',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
    padding: '0 0.6rem',
  },
}));

const ShippingPage = ({ history }) => {
  const classes = useStyles();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ''
  );
  const [country, setCountry] = useState(shippingAddress.country || '');

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push('/payment');
  };
  return (
    <Container maxWidth='xs'>
      <Card className={classes.card}>
        <CheckoutSteps step1 />
        <Typography variant='h5' component='h2'>
          Shipment Details
        </Typography>

        <form onSubmit={submitHandler} className={classes.form}>
          <Box pb={2} pt={2}>
            <TextField
              id='outlined-basic-address'
              type='text'
              fullWidth
              label='Adress'
              name='address'
              size='small'
              variant='outlined'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </Box>

          <Box pb={2}>
            <TextField
              id='outlined-basic-city'
              type='text'
              fullWidth
              label='City'
              name='city'
              size='small'
              variant='outlined'
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </Box>

          <Box pb={2}>
            <TextField
              id='outlined-basic-postalCode'
              type='Number'
              fullWidth
              label='PostalCode'
              name='postalCode'
              size='small'
              variant='outlined'
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            />
          </Box>

          <Box>
            <TextField
              id='outlined-basic-country'
              type='text'
              fullWidth
              label='Country'
              name='country'
              size='small'
              variant='outlined'
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </Box>

          <Button
            type='submit'
            variant='contained'
            fullWidth
            color='primary'
            className={classes.submitBtn}
          >
            Continue
          </Button>
        </form>
      </Card>
    </Container>
  );
};

export default ShippingPage;
