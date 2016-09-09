const express = require('express');
const path = require('path');

const host = '127.0.0.1';
const port = 3000;

var app = express();

app.use(express.static('.'));

app.get('/', (req, res) => {
  res.send('index.html');
});

app.listen(port, host, () => {
  console.log('Example app listening at http://%s:%s', host, port);
});
