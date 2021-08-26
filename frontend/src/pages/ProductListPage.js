import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Paginate from '../Components/Paginate';
import {
  listProducts,
  deleteProduct,
  createProduct,
} from '../actions/productActions';
import { PRODUCT_CREATE_RESET } from '../reducers/types';
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Paper,
  makeStyles,
  IconButton,
  TableRow,
  Typography,
  Grid,
  Button,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  loadBox: {
    display: 'flex',
    justifyContent: 'center',
  },
  alertM: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  headStyle: {
    marginBottom: '1rem',
    justifyContent: 'space-between',
  },
  funcBtn: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

const ProductListPage = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;
  const classes = useStyles();
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });

    if (!userInfo || !userInfo.isAdmin) {
      history.push(`/login`);
    }
    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts('', pageNumber));
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
    pageNumber,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm('Are Your Sure?')) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };
  return (
    <>
      <Grid container className={classes.headStyle}>
        <Grid item md={6} xs={6}>
          <Typography variant='h5' component='h2' gutterBottom>
            Products
          </Typography>
        </Grid>
        <Grid
          item
          md={6}
          xs={6}
          style={{ display: 'flex', flexDirection: 'row-reverse' }}
        >
          <Button
            onClick={createProductHandler}
            variant='contained'
            startIcon={<AddCircleIcon />}
          >
            Add new Product
          </Button>
        </Grid>
      </Grid>
      {loadingDelete && (
        <div className={classes.loadBox}>
          <CircularProgress />
        </div>
      )}
      {errorDelete && (
        <div className={classes.alertM}>
          <Alert severity='error'>{errorDelete}</Alert>
        </div>
      )}

      {loadingCreate && (
        <div className={classes.loadBox}>
          <CircularProgress />
        </div>
      )}
      {errorCreate && (
        <div className={classes.alertM}>
          <Alert severity='error'>{errorCreate}</Alert>
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
        <>
          <TableContainer component={Paper}>
            <Table aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>NAME</TableCell>
                  <TableCell>PRICE</TableCell>
                  <TableCell>CATEGORY</TableCell>
                  <TableCell>BRAND</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell>{product._id}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>${product.price}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.brand}</TableCell>
                    <TableCell className={classes.funcBtn}>
                      <IconButton
                        size='small'
                        component={Link}
                        to={`/admin/product/${product._id}/edit`}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size='small'
                        onClick={() => {
                          deleteHandler(product._id);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default ProductListPage;
