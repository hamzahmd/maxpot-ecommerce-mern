import React from 'react';
import {
  Button,
  Card,
  Box,
  TextField,
  Container,
  makeStyles,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '2rem',
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

const ContactPage = () => {
  const classes = useStyles();
  return (
    <Container maxWidth='sm'>
      <Card className={classes.card}>
        <Typography variant='h5' component='h1'>
          Contact Us
        </Typography>
        <form
          // onSubmit={submitHandler}
          className={classes.form}
        >
          <Box pb={2} pt={2}>
            <TextField
              id='outlined-basic-name'
              type='name'
              fullWidth
              label='Name'
              name='name'
              size='small'
              variant='outlined'
              // value={name}
              // onChange={(e) => setName(e.target.value)}
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
              // value={email}
              // onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Box>

          <Box pb={2}>
            <TextField
              id='outlined-basic-product'
              type='text'
              fullWidth
              label='Product'
              name='product'
              size='small'
              variant='outlined'
              // value={password}
              // onChange={(e) => setPassword(e.target.value)}
              // required
            />
          </Box>

          <Box pb={2}>
            <TextField
              id='outlined-basic-msg'
              multiline={true}
              rows={5}
              type='text'
              fullWidth
              label='Message'
              name='message'
              size='small'
              variant='outlined'
              // value={confirmPassword}
              // onChange={(e) => setConfirmPassword(e.target.value)}
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
            Send Your Inquiry
          </Button>
        </form>
      </Card>
    </Container>
  );
};

export default ContactPage;
