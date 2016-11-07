const express = require('express');

const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;

const app = express();
require('./routes')(app);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
