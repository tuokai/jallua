const express = require('express');

const dataFetching = require('./logics/dataFetching');

const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;

// Connect to database
require('./db');

const app = express();
require('./routes')(app);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
  dataFetching.updateDb();
});
