const mongoose = require('mongoose');

const config = {
  db: 'myDb',
  host: 'localhost',
  user: '',
  pw: '',
  port: 27017,
};

const port = (config.port.length > 0) ? `:${config.port}` : '';
const login = (config.user.length > 0) ? `${config.user}:${config.pw}@` : '';
const uristring = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL
  || `mongodb://${login}${config.host}${port}/${config.db}`;

const mongoOptions = { db: { safe: true } };

// Connect to Database
mongoose.connect(uristring, mongoOptions, (err) => {
  if (err) {
    console.log(`ERROR connecting to: ${uristring} . ${err}`);
  } else {
    console.log(`Successfully connected to: ${uristring}`);
  }
});

exports.mongoose = mongoose;

