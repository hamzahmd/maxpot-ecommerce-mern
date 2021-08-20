import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../actions/userActions';

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

const RegisterPage = ({ location, history }) => {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(register(name, email, password));
    }
  };
  return (
    <Container maxWidth='xs'>
      <Card className={classes.card}>
        <Typography variant='h5' component='h1'>
          Register
        </Typography>
        {message && (
          <div className={classes.alertM}>
            <Alert severity='error'>{message}</Alert>
          </div>
        )}
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

          <Box pb={2} pt={2}>
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

          <Box pb={2}>
            <TextField
              id='outlined-basic-password2'
              type='password'
              fullWidth
              label='Confirm Password'
              name='confirmPassword'
              size='small'
              variant='outlined'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
            Register
          </Button>

          <Typography color='initial'>
            Have an Account?
            <Button
              component={Link}
              to={redirect ? `/login?redirect=${redirect}` : `/login`}
            >
              Login
            </Button>
          </Typography>
        </form>
      </Card>
    </Container>
  );
};

export default RegisterPage;
