module.exports = (app) => {
  const mongoose = require('mongoose');
  const Store = mongoose.models.Store;
  const dataFetching = require('../logics/dataFetching');

  app.get('/', (req, res) => {
    res.status(200);
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World\n');
  });

  app.get('/stores', (req, res) => {
    const serveStores = () => {
      Store.find((err, stores) => {
        if (err) {
          return res.status(500).json(err);
        }
        const response = stores.map((store) => {
          // Strip out unwanted parts of store object
          const { streetAddress, zipCode, postOffice, storeNumber, condition } = store;
          const [lng, lat] = store.location.coordinates;
          return { streetAddress, zipCode, postOffice, storeNumber, lng, lat, condition };
        });
        return res.status(200).json(response);
      });
    };
    dataFetching.refreshWeather()
      .then(() => serveStores())
      .catch((err) => {
        console.log(`Could not refresh weather data (${err}), returning stale data`);
        serveStores();
      });
  });

  app.get('/stores/closest', (req, res) => {
    const { lat, lng } = req.query;
    const coordinates = [parseFloat(lng), parseFloat(lat)];
    if (!lat || !lng || !parseFloat(lng) || !parseFloat(lat)) {
      return res.status(400).json({ error: 'Invalid request' });
    }

    // setup geoJson for query
    const geoJson = {
      type: 'Point',
      coordinates,
    };

    // setup options for query
    const options = {
      spherical: true,
      maxDistance: 1000000,
      query: {
        'location.type': 'Point',
      },
    };

    return Store.geoNear(geoJson, options, (err, stores) => {
      if (err) {
        return res.status(500).json({ error: 'Could not find anything with query' });
      }
      const storeIds = stores.map(store => store.obj.storeNumber);
      return res.status(200).json(storeIds);
    });
  });
};
