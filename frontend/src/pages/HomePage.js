import React, { Fragment, useEffect, useState } from 'react';
import Product from '../Components/Product';
import axios from 'axios';
import { Grid, Typography } from '@material-ui/core';

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('/api/products');
      setProducts(data);
    };
    fetchProducts();
  }, []);
  return (
    <Fragment>
      <Typography variant='h5' component='h1' style={{ padding: '1.5rem' }}>
        Latest Products
      </Typography>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item key={product._id} xs={12} sm={6} md={4} lg={3} xl={3}>
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
    </Fragment>
  );
};

export default HomePage;