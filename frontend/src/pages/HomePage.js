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
  coverImage: {
    background: `#333 url(/images/header-cover.jpg) no-repeat center center/cover`,
    marginTop: theme.spacing(-3),
    marginBottom: theme.spacing(4),
    color: '#fff',
    height: '50vh',
    backdropFilter: 'brightness(120%)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
  },
  alertM: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  headP: {
    paddingBottom: '1.5rem',
    paddingLeft: '1.5rem',
  },
  loadBox: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

const HomePage = ({ match }) => {
  const keyword = match.params.keyword;
  const classes = useStyles();
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <Fragment>
      <div className={classes.coverImage}>
        <Typography variant='h3' component='h1' gutterBottom>
          Welcome to Maxpot
        </Typography>
        <Typography variant='h5'>Attitude towards Innovation</Typography>
      </div>
      <Typography variant='h5' component='h2' className={classes.headP}>
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
