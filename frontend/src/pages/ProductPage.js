import React, { Fragment, useEffect } from 'react';
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
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import ProductRating from '../Components/ProductRating';

const ProductPage = ({ match }) => {
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  // _id: '',
  // name: '',
  // image: '',
  // description: '',
  // price: null,
  // countInStock: null,
  // rating: null,
  // numReviews: null,

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match]);

  const { name, image, price, countInStock, rating, description, numReviews } =
    product;
  return (
    <Fragment>
      <Button
        component={Link}
        to='/'
        variant='outlined'
        style={{ color: '#1B4E59', margin: '1.5rem' }}
      >
        Return
      </Button>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </div>
      ) : error ? (
        <div
          style={{
            width: '100%',
            marginTop: '2rem',
          }}
        >
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
                style={{
                  margin: 'auto',
                  display: 'block',
                  maxWidth: '100%',
                  maxHeight: '100%',
                }}
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

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    margin: '1rem',
                  }}
                >
                  <Button
                    variant='contained'
                    style={{
                      color: '#f4f4f4',

                      background: '#1B4E59',
                    }}
                  >
                    Add to cart
                  </Button>
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
