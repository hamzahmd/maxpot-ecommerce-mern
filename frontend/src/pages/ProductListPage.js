import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts, deleteProduct } from '../actions/productActions';
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
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CancelIcon from '@material-ui/icons/Cancel';
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
  const classes = useStyles();
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, userInfo, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm('Are Your Sure?')) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = (product) => {
    //
  };
  return (
    <>
      <Grid container className={classes.headStyle}>
        <Grid item md={6} xs={6}>
          <Typography variant='h5' component='h2' gutterBottom>
            Products
          </Typography>
        </Grid>
        <Grid item md={6} xs={6}>
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
      {loading ? (
        <div className={classes.loadBox}>
          <CircularProgress />
        </div>
      ) : error ? (
        <div className={classes.alertM}>
          <Alert severity='error'>{error}</Alert>
        </div>
      ) : (
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
      )}
    </>
  );
};

export default ProductListPage;
