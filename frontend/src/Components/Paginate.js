import React from 'react';
import { Link } from 'react-router-dom';
import { Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  pageBtn: {
    margin: '1rem 0 0 1rem',
  },
}));

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  const classes = useStyles();
  return (
    pages > 1 &&
    [...Array(pages).keys()].map((item) => (
      <Button
        size='small'
        className={classes.pageBtn}
        color='secondary'
        variant={item + 1 === page ? 'contained' : 'outlined'}
        component={Link}
        key={item + 1}
        to={
          !isAdmin
            ? keyword
              ? `/search/${keyword}/page/${item + 1}`
              : `/page/${item + 1}`
            : `/admin/productlist/${item + 1}`
        }
      >
        {item + 1}
      </Button>
    ))
  );
};

export default Paginate;
