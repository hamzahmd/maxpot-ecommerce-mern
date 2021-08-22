import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs, Button } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize='small' />}
        aria-label='breadcrumb'
      >
        {step1 ? (
          <Button size='small' component={Link} to='/shipping' color='inherit'>
            Shipping
          </Button>
        ) : (
          <Button size='small' disabled>
            Shipping
          </Button>
        )}
        {step2 ? (
          <Button size='small' component={Link} to='/payment' color='inherit'>
            Payment
          </Button>
        ) : (
          <Button size='small' disabled>
            Payment
          </Button>
        )}
        {step3 ? (
          <Button
            size='small'
            component={Link}
            to='/placeorder'
            color='inherit'
          >
            Order
          </Button>
        ) : (
          <Button size='small' disabled>
            Order
          </Button>
        )}
      </Breadcrumbs>
    </div>
  );
};

export default CheckoutSteps;
