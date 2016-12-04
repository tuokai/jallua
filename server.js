const express = require('express');
const cors = require('cors');

const dataFetching = require('./logics/dataFetching');

const hostname = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 3000;

// Connect to database
require('./db');

const app = express();
// This app has no user state, so we can be generous with CORS
app.use(cors());
require('./routes')(app);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
  dataFetching.updateDb();
});
