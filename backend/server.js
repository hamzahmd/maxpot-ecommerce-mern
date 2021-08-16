const express = require('express');
const dotenv = require('dotenv');
const products = require('./data/products');

dotenv.config();
const app = express();

app.get('/', (req, res) => {
  res.send('API is running');
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find((prod) => prod._id === req.params.id);
  res.json(product);
});

app.get('/api/products', (req, res) => {
  res.json(products);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    `App listening on port in ${process.env.NODE_ENV} mode on port ${PORT}`
  );
});
