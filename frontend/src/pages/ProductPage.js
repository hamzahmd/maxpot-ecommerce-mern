import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listProductDetails } from '../actions/productActions';
import {
  Button,
  Grid,
  CardMedia,
  Typography,
  Chip,
  Card,
  CardContent,
  CircularProgress,
  makeStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import ProductRating from '../Components/ProductRating';

const useStyles = makeStyles((theme) => ({
  alertM: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  returnBtn: {
    color: '#1B4E59',
    margin: '1.5rem',
  },
  loadBox: {
    display: 'flex',
    justifyContent: 'center',
  },
  cardImg: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  cartPos: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '1rem 0',
  },
  btnColor: {
    color: '#f4f4f4',
    background: '#1B4E59',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 100,
  },
}));

const ProductPage = ({ match, history }) => {
  const [qty, setQty] = useState(1);
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const { name, image, price, countInStock, rating, description, numReviews } =
    product;

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };
  return (
    <Fragment>
      <Button
        component={Link}
        to='/'
        variant='outlined'
        className={classes.returnBtn}
      >
        Return
      </Button>
      {loading ? (
        <div className={classes.loadBox}>
          <CircularProgress />
        </div>
      ) : error ? (
        <div className={classes.alertM}>
          <Alert severity='error'>{error}</Alert>
        </div>
      ) : (
        <Grid container justifyContent='center' spacing={3}>
          <Grid item lg={3} md={3} sm={5} xs={12}>
            <Card>
              <CardMedia
                component='img'
                alt={name}
                image={image}
                title={name}
                className={classes.cardImg}
              />
            </Card>
          </Grid>

          <Grid item lg={4} md={5} sm={7} xs={12}>
            <Card>
              <CardContent>
                <Grid container alignItems='center'>
                  <Grid item xs>
                    <Typography gutterBottom variant='h4'>
                      {name}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography gutterBottom variant='h6'>
                      ${price}
                    </Typography>
                    <Typography variant='h6'>
                      <Chip
                        size='small'
                        color={countInStock === 0 ? 'secondary' : 'primary'}
                        label={countInStock === 0 ? 'Out of Stock' : 'In Stock'}
                      />
                    </Typography>
                  </Grid>
                </Grid>

                <Typography
                  gutterBottom
                  variant='body2'
                  color='textSecondary'
                  component='div'
                >
                  <ProductRating
                    value={rating}
                    text={`${numReviews} reviews`}
                  />
                </Typography>

                <Typography color='textSecondary' variant='body1'>
                  {description}
                </Typography>

                <div className={classes.cartPos}>
                  {product.countInStock > 0 && (
                    <FormControl
                      variant='outlined'
                      className={classes.formControl}
                    >
                      <InputLabel id='demo-simple-select-outlined-label'>
                        Qty
                      </InputLabel>
                      <Select
                        labelId='demo-simple-select-outlined-label'
                        id='demo-simple-select-outlined'
                        label='Qty'
                        open={open}
                        onClose={() => setOpen(false)}
                        onOpen={() => setOpen(true)}
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <MenuItem key={x + 1} value={x + 1}>
                            {x + 1}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                  <div>
                    {countInStock === 0 ? (
                      <Button variant='contained' disabled>
                        Add to cart
                      </Button>
                    ) : (
                      <Button
                        onClick={addToCartHandler}
                        variant='contained'
                        color='secondary'
                        className={classes.btnColor}
                      >
                        Add to cart
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Fragment>
  );
};

export default ProductPage;
