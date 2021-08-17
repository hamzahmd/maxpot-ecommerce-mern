import React, { Fragment, useEffect } from 'react';
import Product from '../Components/Product';
import {
  Grid,
  Typography,
  CircularProgress,
  makeStyles,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';

const useStyles = makeStyles((theme) => ({
  alertM: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  headP: {
    padding: '1.5rem',
  },
  loadBox: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

const HomePage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <Fragment>
      <Typography variant='h5' component='h1' className={classes.headP}>
        Latest Products
      </Typography>
      {loading ? (
        <div className={classes.loadBox}>
          <CircularProgress />
        </div>
      ) : error ? (
        <div className={classes.alertM}>
          <Alert severity='error'>{error}</Alert>{' '}
        </div>
      ) : (
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item key={product._id} xs={12} sm={6} md={4} lg={3} xl={3}>
              <Product product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </Fragment>
  );
};

export default HomePage;
