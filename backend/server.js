const express = require('express');
const products = require('./data/products');

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

app.listen(5000, () => {
  console.log('App listening on port 5000!');
});
