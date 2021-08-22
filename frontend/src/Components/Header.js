import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userActions';
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  makeStyles,
  Typography,
  Menu,
  MenuItem,
} from '@material-ui/core';

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PersonIcon from '@material-ui/icons/Person';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(3),
  },
  SportsMmaIcon: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing(1),
    color: '#f4f4f4',
    background: '#1B4E59',
  },
  logo: {
    maxWidth: 40,
  },
}));

const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const LogoutHandler = () => {
    history.push(`/login`);
    dispatch(logout());

    setAnchorEl(null);
  };

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
            <img src='/logo256.png' alt='logo' className={classes.logo} />
          </IconButton>
          <Typography variant='h5' className={classes.title}>
            MAXPOT
          </Typography>

          <Button
            component={Link}
            to='/cart'
            variant='contained'
            color='primary'
            className={classes.button}
            startIcon={<ShoppingCartIcon />}
          >
            Cart
          </Button>
          {userInfo ? (
            <div>
              <Button
                aria-controls='simple-menu'
                aria-haspopup='true'
                variant='contained'
                color='primary'
                className={classes.button}
                onClick={handleClick}
                startIcon={<ExpandMoreIcon />}
              >
                {userInfo.name}
              </Button>
              <Menu
                id='username'
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem component={Link} to='/profile' onClick={handleClose}>
                  Profile
                </MenuItem>

                <MenuItem component={Link} to='/login' onClick={LogoutHandler}>
                  Logout
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <Button
              component={Link}
              to='/login'
              variant='contained'
              color='primary'
              className={classes.button}
              startIcon={<PersonIcon />}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default Header;
