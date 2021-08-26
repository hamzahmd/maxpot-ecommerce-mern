import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  listProductDetails,
  createProductReview,
} from '../actions/productActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../reducers/types';
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
  List,
  ListItem,
  Paper,
  Box,
  TextField,
  Container,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import ProductRating from '../Components/ProductRating';

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '2rem',
  },
  alertM: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  returnBtn: {
    color: '#1B4E59',
    marginBottom: '1.5rem',
    marginLeft: '1.5rem',
  },
  loadBox: {
    display: 'flex',
    justifyContent: 'center',
  },
  gridproductdetails: {
    alignItems: 'center',
    marginBottom: '1rem',
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
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [qty, setQty] = useState(1);
  const [open, setOpen] = useState(false);
  const [openr, setOpenr] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const { success: successReview, error: errorReview } = productReviewCreate;

  useEffect(() => {
    if (successReview) {
      alert('Review Submitted!');
      setRating('');
      setComment('');
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match, successReview]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    );
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
        <>
          <Grid
            container
            justifyContent='center'
            spacing={3}
            className={classes.gridproductdetails}
          >
            <Grid item lg={3} md={3} sm={5} xs={12}>
              <Card>
                <CardMedia
                  component='img'
                  alt={product.name}
                  image={product.image}
                  title={product.name}
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
                        {product.name}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography gutterBottom variant='h6'>
                        ${product.price}
                      </Typography>
                      <Typography variant='h6'>
                        <Chip
                          size='small'
                          color={
                            product.countInStock === 0 ? 'secondary' : 'primary'
                          }
                          label={
                            product.countInStock === 0
                              ? 'Out of Stock'
                              : 'In Stock'
                          }
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
                      value={product.rating}
                      text={`${product.numReviews} reviews`}
                    />
                  </Typography>

                  <Typography color='textSecondary' variant='body1'>
                    {product.description}
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
                      {product.countInStock === 0 ? (
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

          <Grid container>
            <Grid item md={5} xs={12}>
              <Typography gutterBottom variant='h6' component='h2'>
                Reviews
              </Typography>
              {product.reviews.length === 0 && (
                <div className={classes.alertM}>
                  <Alert severity='info'>No Reviews</Alert>
                </div>
              )}
              <List>
                {product.reviews.map((review) => (
                  <ListItem key={review._id}>
                    <Paper style={{ padding: '1rem', width: '70%' }}>
                      <Typography gutterBottom variant='body1'>
                        {review.name}
                      </Typography>
                      <Box mb={1}>
                        <ProductRating value={review.rating} />
                      </Box>
                      <Typography gutterBottom variant='body2' component='p'>
                        {review.createdAt.substring(0, 10)}
                      </Typography>
                      <Typography gutterBottom variant='body2' component='p'>
                        {review.comment}
                      </Typography>
                    </Paper>
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid item md={6}>
              <Container maxWidth='xs'>
                <Card className={classes.card}>
                  <Typography gutterBottom variant='h6' component='h2'>
                    Share your Reviews
                  </Typography>
                  {errorReview && (
                    <div className={classes.alertM}>
                      <Alert severity='error'>{errorReview}</Alert>
                    </div>
                  )}
                  {userInfo ? (
                    <form onSubmit={submitHandler}>
                      <Box mb={2} mt={1}>
                        <FormControl
                          style={{ minWidth: 350 }}
                          variant='outlined'
                        >
                          <InputLabel id='rating-selector'>Rating</InputLabel>
                          <Select
                            labelId='rating-selector'
                            id='rating-outlined-form'
                            open={openr}
                            onClose={() => setOpenr(false)}
                            onOpen={() => setOpenr(true)}
                            label='Rating'
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                          >
                            <MenuItem value={1}>I hate it</MenuItem>
                            <MenuItem value={2}>I don't like it</MenuItem>
                            <MenuItem value={3}>Neutral</MenuItem>
                            <MenuItem value={4}>Nice Product</MenuItem>
                            <MenuItem value={5}>Excellent Experience</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                      <Box mb={2}>
                        <TextField
                          id='outlined-basic-comment'
                          multiline={true}
                          rows={5}
                          type='text'
                          fullWidth
                          label='Message'
                          name='message'
                          size='small'
                          variant='outlined'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        />
                      </Box>
                      <Button
                        type='submit'
                        variant='contained'
                        fullWidth
                        color='primary'
                        className={classes.btnColor}
                      >
                        Add Review
                      </Button>
                    </form>
                  ) : (
                    <div className={classes.alertM}>
                      <Alert severity='info'>
                        Please{' '}
                        <Button
                          component={Link}
                          to='/login'
                          size='small'
                          color='primary'
                        >
                          Sign in
                        </Button>{' '}
                        to add a review
                      </Alert>
                    </div>
                  )}
                </Card>
              </Container>
            </Grid>
          </Grid>
        </>
      )}
    </Fragment>
  );
};

export default ProductPage;
