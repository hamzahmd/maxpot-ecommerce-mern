import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails, updateProduct } from '../actions/productActions';

import {
  Button,
  Card,
  Box,
  TextField,
  Container,
  CircularProgress,
  makeStyles,
  Typography,
} from '@material-ui/core';

import Alert from '@material-ui/lab/Alert';
import { PRODUCT_UPDATE_RESET } from '../reducers/types';

const useStyles = makeStyles((theme) => ({
  card: {
    // marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '2rem',
  },
  returnBtn: {
    color: '#1B4E59',
    marginBottom: '1.5rem',
    marginLeft: '1.5rem',
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

const ProductEditPage = ({ match, history }) => {
  const classes = useStyles();
  const productId = match.params.id;
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push(`/admin/productlist`);
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setDescription(product.description);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
      }
    }
  }, [product, productId, dispatch, history, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        price,
        name,
        description,
        countInStock,
        brand,
        category,
        image,
      })
    );
  };
  return (
    <>
      <Button
        component={Link}
        to='/admin/productlist'
        variant='outlined'
        className={classes.returnBtn}
      >
        Go Back
      </Button>
      <Container maxWidth='sm'>
        <Card className={classes.card}>
          <Typography variant='h5' component='h1'>
            Edit Product
          </Typography>
          {loadingUpdate && (
            <div className={classes.loadBox}>
              <CircularProgress />
            </div>
          )}
          {errorUpdate && (
            <div className={classes.alertM}>
              <Alert severity='error'>{errorUpdate}</Alert>
            </div>
          )}
          {loading ? (
            <div className={classes.loadBox}>
              <CircularProgress />
            </div>
          ) : error ? (
            <div className={classes.alertM}>
              <Alert severity='error'>{error}</Alert>
            </div>
          ) : (
            <form onSubmit={submitHandler} className={classes.form}>
              <Box pb={2} pt={2}>
                <TextField
                  id='outlined-basic-name'
                  type='name'
                  fullWidth
                  label='Name'
                  name='name'
                  size='small'
                  variant='outlined'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Box>

              <Box pb={2}>
                <TextField
                  id='outlined-basic-price'
                  type='number'
                  fullWidth
                  label='Price'
                  name='price'
                  size='small'
                  variant='outlined'
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </Box>

              <Box pb={2}>
                <TextField
                  id='outlined-basic-image'
                  type='text'
                  fullWidth
                  label='Image'
                  name='image'
                  size='small'
                  variant='outlined'
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  required
                />
              </Box>

              <Box pb={2}>
                <TextField
                  id='outlined-basic-brand'
                  type='text'
                  fullWidth
                  label='Brand'
                  name='brand'
                  size='small'
                  variant='outlined'
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </Box>
              <Box pb={2}>
                <TextField
                  id='outlined-basic-category'
                  type='text'
                  fullWidth
                  label='category'
                  name='category'
                  size='small'
                  variant='outlined'
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                />
              </Box>

              <Box pb={2}>
                <TextField
                  id='outlined-basic-countInStock'
                  type='number'
                  fullWidth
                  label='Stock'
                  name='countInStock'
                  size='small'
                  variant='outlined'
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                  required
                />
              </Box>

              <Box pb={2}>
                <TextField
                  id='outlined-basic-description'
                  type='text'
                  multiline={true}
                  rows={3}
                  fullWidth
                  label='Description'
                  name='description'
                  size='small'
                  variant='outlined'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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
                Update
              </Button>
            </form>
          )}
        </Card>
      </Container>
    </>
  );
};

export default ProductEditPage;
