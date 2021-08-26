import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ORDER_DELIVERD_RESET, ORDER_PAY_RESET } from '../reducers/types';
import {
  getOrderDetails,
  deliverOrder,
  payOrder,
} from '../actions/orderActions';
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
  CircularProgress,
  Box,
  Hidden,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '1.5rem',
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
}));

const OrderPage = ({ match, history }) => {
  const orderId = match.params.id;
  const classes = useStyles();
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { success: successPay, loading: loadingPay } = orderPay;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { success: successDeliver, loading: loadingDeliver } = orderDeliver;

  if (!loading) {
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };
    order.itemsPrice = addDecimals(
      order.orderItems
        .reduce((acc, item) => acc + item.price * item.qty, 0)
        .toFixed(2)
    );
    order.shippingPrice = addDecimals(order.itemsPrice > 100 ? 0 : 10);
    order.taxPrice = addDecimals(Number((0.15 * order.itemsPrice).toFixed(2)));
  }

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }
    if (!order || successDeliver || successPay || order._id !== orderId) {
      dispatch({ type: ORDER_DELIVERD_RESET });
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(orderId));
    }
  }, [order, orderId, dispatch, successDeliver, successPay, history, userInfo]);

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
    dispatch(payOrder(order));
  };

  return (
    <Container>
      <Card className={classes.card}>
        {loading ? (
          <div className={classes.loadBox}>
            <CircularProgress />
          </div>
        ) : error ? (
          <div className={classes.alertM}>
            <Alert severity='error'>{error}</Alert>
          </div>
        ) : (
          <>
            <Typography variant='h6' component='h2' gutterBottom>
              Order: {order._id}
            </Typography>
            <Grid container>
              <Grid item md={7} sm={7} xs={12}>
                <Typography variant='h6' component='h2' gutterBottom>
                  Shipping
                </Typography>
                <Typography component='p' variant='body1'>
                  <strong>Name: </strong>
                  {order.user.name}
                </Typography>
                <Typography component='p' variant='body1'>
                  <strong>Email: </strong>
                  <Button
                    rel='noopener noreferrer'
                    target='_blank'
                    href={`mailto:${order.user.email}`}
                  >
                    {order.user.email}
                  </Button>
                </Typography>
                <Typography component='p' variant='body1'>
                  <strong>Address:</strong> {order.shippingAddress.address},{' '}
                  {order.shippingAddress.city},{' '}
                  {order.shippingAddress.postalCode},{' '}
                  {order.shippingAddress.country}
                </Typography>
                {order.isDelieverd ? (
                  <div className={classes.alertM}>
                    <Alert severity='success'>
                      Delieverd on {order.delieverdAt}
                    </Alert>
                  </div>
                ) : (
                  <div className={classes.alertM}>
                    <Alert severity='error'>Not Delieverd</Alert>
                  </div>
                )}
                <Typography
                  variant='h6'
                  component='h2'
                  gutterBottom
                  style={{ marginTop: '1rem' }}
                >
                  Payment Method
                </Typography>
                <Typography component='p' variant='body1'>
                  <strong>Method:</strong> {order.paymentMethod}
                </Typography>
                {order.isDelieverd ? (
                  <div className={classes.alertM}>
                    <Alert severity='success'>
                      Paid on {order.delieverdAt}
                    </Alert>
                  </div>
                ) : (
                  <div className={classes.alertM}>
                    <Alert severity='error'>Not Paid</Alert>
                  </div>
                )}
                <Typography
                  variant='h6'
                  component='h2'
                  style={{ marginTop: '1rem' }}
                >
                  Order Items
                </Typography>
                <List>
                  {order.orderItems.map((item, index) => (
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

                        <Grid md={4} sm={6} xs={7}>
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
                <Box pl={2}>
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
                        <ListItem>${order.itemsPrice}</ListItem>
                        <ListItem>${order.shippingPrice}</ListItem>
                        <ListItem>${order.taxPrice}</ListItem>
                        <ListItem>${order.totalPrice}</ListItem>
                      </Grid>
                    </Grid>
                    {loadingDeliver && loadingPay && (
                      <div className={classes.loadBox}>
                        <CircularProgress />
                      </div>
                    )}
                    {userInfo && userInfo.isAdmin && !order.isDelieverd && (
                      <Button onClick={deliverHandler} variant='contained'>
                        Mark As Deliverd and Paid
                      </Button>
                    )}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </>
        )}
      </Card>
    </Container>
  );
};

export default OrderPage;
