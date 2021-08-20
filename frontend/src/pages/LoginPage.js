import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/userActions';

import {
  Button,
  Card,
  Box,
  TextField,
  Container,
  CircularProgress,
  makeStyles,
  Typography,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: theme.spacing(8),
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

const LoginPage = ({ location, history }) => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  return (
    <Container maxWidth='xs'>
      <Card className={classes.card}>
        <Typography variant='h5' component='h1'>
          Sign In
        </Typography>
        {error && (
          <div className={classes.alertM}>
            <Alert severity='error'>{error}</Alert>
          </div>
        )}
        {loading && (
          <div className={classes.loadBox}>
            <CircularProgress />
          </div>
        )}
        <form onSubmit={submitHandler} className={classes.form}>
          <Box pb={2} pt={2}>
            <TextField
              id='outlined-basic-name'
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
            <TextField
              id='outlined-basic-password'
              type='password'
              fullWidth
              label='Password'
              name='password'
              size='small'
              variant='outlined'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Box>

          <Button
            type='submit'
            variant='contained'
            fullWidth
            color='primary'
            className={classes.submitBtn}
          >
            Sign In
          </Button>

          <Typography color='initial'>
            New Customer?
            <Button
              component={Link}
              to={redirect ? `/register?redirect=${redirect}` : '/register'}
            >
              Register
            </Button>
          </Typography>
        </form>
      </Card>
    </Container>
  );
};

export default LoginPage;
