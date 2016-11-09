const fs = require('fs');
const path = require('path');
const request = require('superagent');
const config = require('../config');

const storesJSON = path.join(__dirname, '../cache/stores.json');
const addressesTsv = path.join(__dirname, '../cache/addresses.tsv');

const updateStores = () => {
  request
    .get(config.apiUrls.alko.jsonStores)
    .end((err, res) => {
      if (err) {
        console.log(err);
        return;
      }

      fs.writeFile(storesJSON, JSON.stringify(res.body), (writeError) => {
        if (writeError) {
          console.log('Failed to save stores data:', writeError);
        } else {
          console.log('Stores data fetched & saved to cache');
        }
      });
    });
};

const updateAddresses = () => {
  request
    .get(config.apiUrls.alko.tsvAddresses)
    .end((err, res) => {
      if (err) {
        console.log(err);
        return;
      }
      fs.writeFile(addressesTsv, res.text, (writeError) => {
        if (writeError) {
          console.log('Failed to save address data:', writeError);
        } else {
          console.log('Address data fetched & saved to cache');
        }
      });
    });
};

const updateCache = () => {
  // eslint-disable-next-line no-unused-vars
  fs.stat(storesJSON, (err, stat) => {
    if (!err) {
      console.log('Stores already found from cache');
      // TODO: Check timestamp of file and re-fetch data if contents are too old
    } else if (err.code === 'ENOENT') {
      updateStores();
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
      updateAddresses();
    } else {
      console.log('Error:', err.code);
    }
  });
};

updateCache();

exports.storesJSON = storesJSON;
exports.addressesTsv = addressesTsv;
