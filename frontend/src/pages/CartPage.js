import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../actions/cartActions';
import {
  Button,
  Grid,
  CardMedia,
  Typography,
  Card,
  CardActionArea,
  List,
  ListItem,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  IconButton,
  Tooltip,
  Paper,
  Hidden,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
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

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  const checkoutHandler = () => {
    history.push('/login?redirect=shipping');
  };

  return (
    <Fragment>
      <Grid container>
        <Grid item md={6} sm={12} xs={12}>
          <Typography
            variant='h5'
            component='h1'
            style={{ paddingLeft: '1rem' }}
          >
            Shopping Cart
          </Typography>
          {cartItems.length === 0 ? (
            <div style={{ marginTop: '1rem' }}>
              <Alert severity='info'>
                Your cart is empty
                <Button component={Link} to='/' size='small' color='primary'>
                  Go back
                </Button>
              </Alert>
            </div>
          ) : (
            <List>
              {cartItems.map((item) => (
                <ListItem key={item.product}>
                  <Paper>
                    <Grid container style={{ alignItems: 'center' }}>
                      <Grid
                        item
                        md={2}
                        sm={2}
                        xs={4}
                        style={{ paddingRight: '1rem' }}
                      >
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
                      <Hidden only='xs'>
                        <Grid item md={4} sm={4}>
                          <Typography variant='body1'>{item.name}</Typography>
                        </Grid>
                      </Hidden>
                      <Grid item md={2} sm={2} xs={3}>
                        <Typography
                          variant='body1'
                          // style={{ paddingLeft: '1rem' }}
                        >
                          ${item.price}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        md={2}
                        sm={2}
                        xs={3}
                        // style={{ paddingLeft: '1rem' }}
                      >
                        <FormControl
                          variant='outlined'
                          // className={classes.formControl}
                        >
                          <InputLabel id='demo-simple-select-outlined-label'>
                            Qty
                          </InputLabel>
                          <Select
                            labelId='demo-simple-select-outlined-label'
                            id='demo-simple-select-outlined'
                            size='small'
                            label='Qty'
                            value={item.qty}
                            onChange={(e) =>
                              dispatch(
                                addToCart(item.product, Number(e.target.value))
                              )
                            }
                          >
                            {[...Array(item.countInStock).keys()].map((x) => (
                              <MenuItem key={x + 1} value={x + 1}>
                                {x + 1}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid
                        item
                        md={2}
                        sm={2}
                        xs={2}
                        style={{ paddingRight: '1rem' }}
                      >
                        <Tooltip title='Delete'>
                          <IconButton
                            aria-label='delete'
                            onClick={() => removeFromCartHandler(item.product)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </Grid>
                    </Grid>
                  </Paper>
                </ListItem>
              ))}
            </List>
          )}
        </Grid>
        <Grid item md={4} sm={12} xs={12}>
          <Card style={{ padding: '1rem', margin: '3rem 1rem' }}>
            <Typography variant='h5' component='h2'>
              Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
              Items
            </Typography>
            <Typography
              variant='h6'
              style={{ padding: '1rem 0', color: '#1B4E59' }}
            >
              $
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </Typography>
            <Button
              variant='contained'
              fullWidth
              style={{ color: '#f4f4f4', background: '#1B4E59' }}
              disabled={cartItems.length === 0}
              onClick={checkoutHandler}
            >
              Proceed To Checkout
            </Button>
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default CartPage;
