import React from 'react';
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
  root: {
    minWidth: 275,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  title: {
    fontSize: 14,
  },
});

const Product = ({ product }) => {
  const classes = useStyles();
  return (
    <Container maxWidth='xs'>
      <Card className={classes.root} style={{ padding: '1rem' }}>
        <CardActionArea>
          <CardMedia
            className={classes.img}
            component='img'
            alt={product.name}
            image={product.image}
            title={product.name}
            style={{ paddingBottom: '1rem' }}
          />

          <Typography
            variant='body1'
            color='textSecondary'
            component='p'
            paragraph
          >
            {product.description}
          </Typography>
          <Typography variant='body2' color='textSecondary' component='div'>
            {product.rating} from {product.numReviews} reviews
          </Typography>
          <Typography gutterBottom variant='h6' component='h3'>
            ${product.price}
          </Typography>
        </CardActionArea>
      </Card>
    </Container>
  );
};

export default Product;
