const request = require('superagent');
const mongoose = require('mongoose');

require('../models/store');

const config = require('../config');
const dataHandling = require('./dataHandling');

const Store = mongoose.models.Store;

const fetchAddresses = () => (
  request
    .get(config.apiUrls.alko.tsvAddresses)
    .then(res => res.text, err => console.log('Error when fetching addresses', err))
);

const storeAddressesToDb = () => {
  fetchAddresses().then((addresses) => {
    const parsed = dataHandling.parseAddressResponse(addresses);
    parsed.forEach((item) => {
      Store.findOne({ storeNumber: item.storeNumber }, (err, store) => {
        if (err) {
          console.log('db error:', err);
        }
        if (!store) {
          // Store is not yet saved to DB
          new Store(item).save((saveError) => {
            if (saveError) {
              console.log('Failed to save item to db', saveError);
            }
          });
        } else {
          // Same store with same id is already in DB
          // Here we could check if we want to update information, but probably it is quite safe
          // to think that store address does not change too often.
        }
      });
    });
    console.log('Address data fetched & saved to db');
  })
  .catch(err => console.log(err));
};

const updateDb = () => {
  storeAddressesToDb();
};

exports.updateDb = updateDb;
