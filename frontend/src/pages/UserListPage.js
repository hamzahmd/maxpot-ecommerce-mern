import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listUsers, deleteUser } from '../actions/userActions';
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
}));

const UserListPage = ({ history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      history.push('/login');
    }
    dispatch(listUsers());
  }, [dispatch, history, successDelete, userInfo]);

  const deleteHandler = (id) => {
    if (window.confirm('Are Your Sure?')) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <>
      <Typography variant='h5' component='h2' gutterBottom>
        Users
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
                <TableCell>NAME</TableCell>
                <TableCell>EMAIL</TableCell>
                <TableCell>ADMIN</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user._id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {user.isAdmin ? <CheckBoxIcon /> : <CancelIcon />}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size='small'
                      component={Link}
                      to={`/admin/user/${user._id}/edit`}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size='small'
                      onClick={() => {
                        deleteHandler(user._id);
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

export default UserListPage;
