module.exports = (app) => {
  const mongoose = require('mongoose');
  const Store = mongoose.models.Store;

  app.get('/', (req, res) => {
    res.status(200);
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World\n');
  });

  app.get('/stores', (req, res) => {
    Store.find((err, stores) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).json(stores);
    });
  });
};
