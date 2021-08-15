import React from 'react';
import Rating from '@material-ui/lab/Rating';

const ProductRating = ({ value, text }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Rating value={value} precision={0.5} readOnly />
      <span style={{ paddingLeft: '1rem' }}>{text && text}</span>
    </div>
  );
};

export default ProductRating;
