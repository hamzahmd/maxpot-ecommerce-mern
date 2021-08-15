import React from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  makeStyles,
  Typography,
} from '@material-ui/core';
import SportsMmaIcon from '@material-ui/icons/SportsMma';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PersonIcon from '@material-ui/icons/Person';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  SportsMmaIcon: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing(1),
  },
}));
const Header = () => {
  const classes = useStyles();
  return (
    <header className={classes.root}>
      <AppBar position='sticky' style={{ background: '#1B4E59' }}>
        <Toolbar>
          <IconButton
            component={Link}
            to='/'
            edge='start'
            className={classes.SportsMmaIcon}
            color='inherit'
          >
            <SportsMmaIcon />
          </IconButton>
          <Typography variant='h5' className={classes.title}>
            Maxpot
          </Typography>

          <Button
            component={Link}
            to='/cart'
            variant='contained'
            style={{ color: '#f4f4f4', background: '#1B4E59' }}
            className={classes.button}
            startIcon={<ShoppingCartIcon />}
          >
            Cart
          </Button>
          <Button
            component={Link}
            to='/login'
            variant='contained'
            style={{ color: '#f4f4f4', background: '#1B4E59' }}
            className={classes.button}
            startIcon={<PersonIcon />}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default Header;
