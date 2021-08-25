import React, { useState } from 'react';
import {
  Button,
  Card,
  Box,
  TextField,
  Container,
  makeStyles,
  Typography,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  alertM: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
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

const ContactPage = ({ history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [product, setProduct] = useState('');
  const [message, setMessage] = useState('');
  const [msg, setMsg] = useState('');
  const classes = useStyles();
  const submitContactUs = (e) => {
    e.preventDefault();
    setMsg('We will get back you soon');
    feedback();
    setTimeout(() => {
      history.push(`/`);
    }, 3000);
  };
  const feedback = () => {
    setName('');
    setEmail('');
    setProduct('');
    setMessage('');
  };

  return (
    <Container maxWidth='sm'>
      <Card className={classes.card}>
        <Typography variant='h5' component='h1'>
          Contact Us
        </Typography>
        {msg && (
          <div className={classes.alertM}>
            <Alert severity='success'>{msg}</Alert>
          </div>
        )}
        <form onSubmit={submitContactUs} className={classes.form}>
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
            <TextField
              id='outlined-basic-product'
              type='text'
              fullWidth
              label='Product'
              name='product'
              size='small'
              variant='outlined'
              value={product}
              onChange={(e) => setProduct(e.target.value)}
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
              value={message}
              onChange={(e) => setMessage(e.target.value)}
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
