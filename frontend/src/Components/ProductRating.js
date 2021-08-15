import React from 'react';
import Rating from '@material-ui/lab/Rating';

const ProductRating = ({ value, text }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Rating value={value} precision={0.5} readOnly />{' '}
      <span>{text && text}</span>
    </div>
  );
};

export default ProductRating;
