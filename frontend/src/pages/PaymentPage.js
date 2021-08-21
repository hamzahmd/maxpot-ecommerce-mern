import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../Components/CheckoutSteps';
import {
  Button,
  Card,
  Container,
  makeStyles,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '2rem',
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
  },
}));

const PaymentPage = ({ history }) => {
  const classes = useStyles();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!shippingAddress) {
    history.push('/shipping');
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod({ paymentMethod }));
    history.push('/placeorder');
  };
  return (
    <Container maxWidth='xs'>
      <Card className={classes.card}>
        <CheckoutSteps step1 step2 />
        <Typography variant='h5' component='h2'>
          Payment Method
        </Typography>

        <form onSubmit={submitHandler} className={classes.form}>
          <FormControl component='fieldset'>
            <FormLabel component='legend'>Select Method</FormLabel>
            <RadioGroup>
              <FormControlLabel
                value='PayPal'
                control={<Radio />}
                label='PayPal'
                onChange={(e) => setPaymentMethod(e.target.value)}
                checked={paymentMethod === 'PayPal'}
              />
              {/* <FormControlLabel
                id='Jazzcash'
                value='JazzCash'
                control={<Radio />}
                label='JazzCash'
                onChange={(e) => setPaymentMethod(e.target.value)}
                checked={paymentMethod === 'JazzCash'}
              /> */}
            </RadioGroup>
          </FormControl>

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

export default PaymentPage;
