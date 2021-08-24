import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../actions/userActions';

import {
  Button,
  Card,
  Box,
  TextField,
  Container,
  CircularProgress,
  makeStyles,
  Typography,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '2rem',
  },
  returnBtn: {
    color: '#1B4E59',
    marginBottom: '1.5rem',
    marginLeft: '1.5rem',
  },
  alertM: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  loadBox: {
    display: 'flex',
    justifyContent: 'center',
  },
  submitBtn: {
    margin: theme.spacing(3, 0, 2),
    color: '#f4f4f4',
    background: '#1B4E59',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
}));

const UserEditPage = ({ match, history }) => {
  const classes = useStyles();
  const userId = match.params.id;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  useEffect(() => {
    if (!user.name || user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user, userId, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <Button
        component={Link}
        to='/admin/userlist'
        variant='outlined'
        className={classes.returnBtn}
      >
        Go Back
      </Button>
      <Container maxWidth='xs'>
        <Card className={classes.card}>
          <Typography variant='h5' component='h1'>
            Edit User
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
            <form onSubmit={submitHandler} className={classes.form}>
              <Box pb={2} pt={2}>
                <TextField
                  id='outlined-basic-name'
                  type='name'
                  fullWidth
                  label='Name'
                  name='name'
                  size='small'
                  variant='outlined'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Box>

              <Box pb={2}>
                <TextField
                  id='outlined-basic-email'
                  type='email'
                  fullWidth
                  label='Email'
                  name='email'
                  size='small'
                  variant='outlined'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Box>

              <Box pb={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      icon={<CheckBoxOutlineBlankIcon fontSize='small' />}
                      checkedIcon={<CheckBoxIcon fontSize='small' />}
                      checked={isAdmin}
                      name='isadmin'
                      onChange={(e) => setIsAdmin(e.target.checked)}
                    />
                  }
                  label='Is Admin'
                />
              </Box>

              <Button
                type='submit'
                variant='contained'
                fullWidth
                color='primary'
                className={classes.submitBtn}
              >
                Update
              </Button>
            </form>
          )}
        </Card>
      </Container>
    </>
  );
};

export default UserEditPage;
