import React from 'react';
import { Link } from 'react-router-dom';
import ProductRating from './ProductRating';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  makeStyles,
  Typography,
  Container,
} from '@material-ui/core';

const useStyles = makeStyles({
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
});

const Product = ({ product }) => {
  const classes = useStyles();
  return (
    <Container maxWidth='xs'>
      <Card>
        <CardActionArea component={Link} to={`/product/${product._id}`}>
          <CardMedia
            className={classes.img}
            component='img'
            alt={product.name}
            image={product.image}
            title={product.name}
          />
          <CardContent>
            <Typography
              variant='body1'
              color='textSecondary'
              component='p'
              // paragraph
            >
              {product.name}
            </Typography>
            <Typography variant='body2' color='textSecondary' component='div'>
              <ProductRating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </Typography>
            <Typography variant='h6' component='h3'>
              ${product.price}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Container>
  );
};

export default Product;
