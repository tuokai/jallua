const fs = require('fs');
const cache = require('./dataFetching');

const getUniqueCities = () => {
  // TODO: Now this is ran every time server is started. Actually this should be ran only once
  // and then the result should be saved to e.g. local database.
  // Now this is written like this mainly for demonstration purposes.
  if (fs.existsSync(cache.storesJSON)) {
    const stores = require('../cache/stores.json');
    const storeLocations = stores.Groups[0].Tags
    .filter(tag => !!tag.Name)
    // Store name is formed like "Jyväskylä Seppälä Citymarket"
    // (first word: city, rest: can be igored in this case)
    .map(tag => tag.Name.split(' ')[0]);
    return [...new Set(storeLocations)];
  }
  console.log('Error: Stores were not yet loaded to cache');
  return [];
};
const uniqueCities = getUniqueCities();

exports.uniqueCities = uniqueCities;
