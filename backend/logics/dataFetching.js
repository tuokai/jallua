const fs = require('fs');
const path = require('path');
const request = require('superagent');
const config = require('../config');

const storesJSON = path.join(__dirname, '../cache/stores.json');
const addressesTsv = path.join(__dirname, '../cache/addresses.tsv');

const fetchStores = () => (
  request
    .get(config.apiUrls.alko.jsonStores)
    .then(res => res.body, err => console.log('Error when fetching stores', err))
);

const fetchAddresses = () => (
  request
    .get(config.apiUrls.alko.tsvAddresses)
    .then(res => res.text, err => console.log('Error when fetching addresses', err))
);

const storeStoresToCache = () => {
  fetchStores().then((stores) => {
    fs.writeFile(storesJSON, JSON.stringify(stores), (writeError) => {
      if (writeError) {
        console.log('Failed to save stores data:', writeError);
      } else {
        console.log('Stores data fetched & saved to cache');
      }
    });
  })
  .catch(err => console.log(err));
};

const storeAddressesToCache = () => {
  fetchAddresses().then((addresses) => {
    fs.writeFile(addressesTsv, addresses, (writeError) => {
      if (writeError) {
        console.log('Failed to save address data:', writeError);
      } else {
        console.log('Address data fetched & saved to cache');
      }
    });
  })
  .catch(err => console.log(err));
};

const updateCache = () => {
  // eslint-disable-next-line no-unused-vars
  fs.stat(storesJSON, (err, stat) => {
    if (!err) {
      console.log('Stores already found from cache');
      // TODO: Check timestamp of file and re-fetch data if contents are too old
    } else if (err.code === 'ENOENT') {
      storeStoresToCache();
    } else {
      console.log('Error:', err.code);
    }
  });

  // eslint-disable-next-line no-unused-vars
  fs.stat(addressesTsv, (err, stat) => {
    if (!err) {
      console.log('Addressess already found from cache');
      // TODO: Check timestamp of file and re-fetch data if contents are too old
    } else if (err.code === 'ENOENT') {
      storeAddressesToCache();
    } else {
      console.log('Error:', err.code);
    }
  });
};

updateCache();

exports.storesJSON = storesJSON;
exports.addressesTsv = addressesTsv;
