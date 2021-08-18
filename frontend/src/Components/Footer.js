import React from 'react';
import { Box, Typography } from '@material-ui/core';
const Footer = () => {
  return (
    <footer>
      <Box display='flex' justifyContent='center' my='1rem'>
        <Typography>
          Copyright &copy; Maxpot Enterprises {new Date().getFullYear()}
        </Typography>
      </Box>
    </footer>
  );
};
export default Footer;
