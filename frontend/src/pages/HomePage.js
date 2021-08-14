import React, { Fragment } from 'react';
import products from '../products';
import Product from '../Components/Product';
import { Grid } from '@material-ui/core';

const HomePage = () => {
  return (
    <Fragment>
      <h1 style={{ padding: '1.5rem' }}>Latest Products</h1>
      <Grid container justifyContent='center' spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
    </Fragment>
  );
};

export default HomePage;
