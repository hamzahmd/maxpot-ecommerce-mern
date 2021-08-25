import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listOrders } from '../actions/orderActions';
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
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CancelIcon from '@material-ui/icons/Cancel';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

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
  funcBtn: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

const OrderListPage = ({ history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, userInfo]);

  return (
    <>
      <Typography variant='h5' component='h2' gutterBottom>
        Orders
      </Typography>

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
                <TableCell>USER</TableCell>
                <TableCell>DATE</TableCell>
                <TableCell>TOTAL</TableCell>

                <TableCell>DELIVERED</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders &&
                orders.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell>{order._id}</TableCell>
                    <TableCell>{order.user && order.user.name}</TableCell>
                    <TableCell>{order.createdAt.substring(0, 10)}</TableCell>
                    <TableCell>${order.totalPrice}</TableCell>

                    <TableCell>
                      {order.isDelieverd ? <CheckBoxIcon /> : <CancelIcon />}
                    </TableCell>

                    <TableCell>
                      <IconButton
                        size='small'
                        component={Link}
                        to={`/order/${order._id}`}
                      >
                        <HelpOutlineIcon />
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

export default OrderListPage;
