module.exports = (app) => {
  const dataHandling = require('../logics/dataHandling');

  app.get('/', (req, res) => {
    res.status(200);
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World\n');
  });

  app.get('/location/store/cities', (req, res) => {
    const cities = dataHandling.uniqueCities;
    if (cities.length === 0) {
      res.status(500);
    } else {
      res.status(200);
    }
    res.json(cities);
  });
};
