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
          <Button component={Link} to='/shipping' color='inherit'>
            Shipment
          </Button>
        ) : (
          <Button disabled>Shipment</Button>
        )}
        {step2 ? (
          <Button component={Link} to='/payment' color='inherit'>
            Payment
          </Button>
        ) : (
          <Button disabled>Payment</Button>
        )}
        {step3 ? (
          <Button component={Link} to='/order' color='inherit'>
            Place Order
          </Button>
        ) : (
          <Button disabled>Order</Button>
        )}
      </Breadcrumbs>
    </div>
  );
};

export default CheckoutSteps;
