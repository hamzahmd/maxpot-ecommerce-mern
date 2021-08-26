import React, { useState } from 'react';
import { Paper, IconButton, InputBase, makeStyles } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  root: {
    marginRight: '1rem',
    padding: '0 4px',
    display: 'flex',
    alignItems: 'center',
    width: 180,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));

const SearchBox = ({ history }) => {
  const classes = useStyles();
  const [keyword, setKeyword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push('/');
    }
  };
  return (
    <Paper component='form' className={classes.root} onSubmit={submitHandler}>
      <InputBase
        className={classes.input}
        placeholder='Search Products'
        onChange={(e) => setKeyword(e.target.value)}
        inputProps={{ 'aria-label': 'search products' }}
      />
      <IconButton
        type='submit'
        className={classes.iconButton}
        aria-label='search'
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchBox;
