import React, { Fragment, useEffect } from 'react';
import Product from '../Components/Product';
import { Grid, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
const HomePage = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <Fragment>
      <Typography variant='h5' component='h1' style={{ padding: '1.5rem' }}>
        Latest Products
      </Typography>
      {loading ? (
        <h2>loading...</h2>
      ) : error ? (
        <h3>{error}</h3>
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
