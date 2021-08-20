import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { USER_UPDATE_PROFILE_RESET } from '../reducers/types';
import {
  Button,
  Card,
  Box,
  TextField,
  CircularProgress,
  makeStyles,
  Typography,
  Grid,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: theme.spacing(1),
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

const ProfilePage = ({ location, history }) => {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails('profile'));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user, success]);
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };
  return (
    <Grid container>
      <Grid item md={3}>
        <Card className={classes.card}>
          <Typography variant='h5' component='h2'>
            User Profile
          </Typography>
          {message && (
            <div className={classes.alertM}>
              <Alert severity='error'>{message}</Alert>
            </div>
          )}
          {success && (
            <div className={classes.alertM}>
              <Alert severity='success'>Profile Updated</Alert>
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
                // required
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
                // required
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
        </Card>
      </Grid>
      <Grid item md={9}>
        <h2>Orders</h2>
      </Grid>
    </Grid>
  );
};

export default ProfilePage;
