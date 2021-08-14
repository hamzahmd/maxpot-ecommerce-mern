import React from 'react';
// import { Link } from 'react-router-dom';
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
      <AppBar position='sticky'>
        <Toolbar>
          <IconButton
            // component={Link} to='/'
            edge='start'
            className={classes.SportsMmaIcon}
            color='inherit'
          >
            <SportsMmaIcon />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            Maxpot
          </Typography>

          <Button
            variant='contained'
            color='primary'
            className={classes.button}
            startIcon={<ShoppingCartIcon />}
          >
            Cart
          </Button>
          <Button
            variant='contained'
            color='primary'
            className={classes.button}
            startIcon={<PersonIcon />}
          >
            Sign in
          </Button>
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default Header;
