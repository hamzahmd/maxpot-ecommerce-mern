import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../Components/CheckoutSteps';
import { createOrder } from '../actions/orderActions';
import {
  Button,
  Card,
  Container,
  makeStyles,
  Typography,
  Grid,
  List,
  ListItem,
  CardActionArea,
  CardMedia,
  Hidden,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '0.9rem',
  },
}));

const PlaceOrderPage = ({ history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  cart.itemsPrice = addDecimals(
    cart.cartItems
      .reduce((acc, item) => acc + item.price * item.qty, 0)
      .toFixed(2)
  );

  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 10);
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));

  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
    }
    // eslint-disable-next-line
  }, [history, success]);

  const placeOrderHandler = (e) => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };
  return (
    <Container>
      <Card className={classes.card}>
        <CheckoutSteps step1 step2 step3 />
        <Grid container style={{ padding: '0 0.6rem' }}>
          <Grid item md={7} sm={7} xs={12}>
            <Typography variant='h6' component='h2' gutterBottom>
              Shipping
            </Typography>
            <Typography component='p' variant='body1'>
              <strong>Address:</strong> {cart.shippingAddress.address},{' '}
              {cart.shippingAddress.city}, {cart.shippingAddress.postalCode},{' '}
              {cart.shippingAddress.country}
            </Typography>

            <Typography
              variant='h6'
              component='h2'
              gutterBottom
              style={{ marginTop: '1rem' }}
            >
              Payment Method
            </Typography>
            <Typography component='p' variant='body1'>
              <strong>Method:</strong> {cart.paymentMethod}
            </Typography>
            <Typography
              variant='h6'
              component='h2'
              style={{ marginTop: '1rem' }}
            >
              Order Items
            </Typography>
            <List>
              {cart.cartItems.map((item, index) => (
                <ListItem key={index}>
                  <Grid container style={{ alignItems: 'center' }}>
                    <Grid item md={1} sm={3} xs={3}>
                      <Card>
                        <CardActionArea
                          component={Link}
                          to={`/product/${item.product}`}
                        >
                          <CardMedia
                            // className={classes.img}
                            component='img'
                            alt={item.name}
                            image={item.image}
                            title={item.name}
                          />
                        </CardActionArea>
                      </Card>
                    </Grid>

                    <Grid item md={4} sm={6} xs={7}>
                      <Typography
                        component='p'
                        variant='body1'
                        style={{ paddingLeft: '1rem' }}
                      >
                        {item.name}
                      </Typography>
                    </Grid>
                    <Grid item md={4} sm={3} xs={2}>
                      <Typography component='p' variant='body1'>
                        <Hidden only={['sm', 'xs']}>
                          {item.qty} x ${item.price} =
                        </Hidden>{' '}
                        ${(item.qty * item.price).toFixed(2)}
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item md={5} sm={5} xs={12}>
            <Typography variant='h6' component='h2' gutterBottom>
              Order Summary
            </Typography>
            <Typography component='span'>
              <Grid container style={{ alignItems: 'center' }}>
                <Grid item md={3}>
                  <List>
                    <ListItem>Items</ListItem>
                    <ListItem>Shipping</ListItem>
                    <ListItem>Tax</ListItem>
                    <ListItem>Total</ListItem>
                  </List>
                </Grid>
                <Grid item md={2}>
                  <ListItem>${cart.itemsPrice}</ListItem>
                  <ListItem>${cart.shippingPrice}</ListItem>
                  <ListItem>${cart.taxPrice}</ListItem>
                  <ListItem>${cart.totalPrice}</ListItem>
                </Grid>
              </Grid>
            </Typography>
            {error && (
              <div style={{ marginTop: '0.5rem' }}>
                <Alert severity='error'>{error}</Alert>
              </div>
            )}

            <Button
              style={{ color: '#f4f4f4', background: '#1B4E59' }}
              onClick={placeOrderHandler}
              variant='contained'
            >
              Place Order
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
};

export default PlaceOrderPage;
