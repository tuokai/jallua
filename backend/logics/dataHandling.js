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
  } else {
    console.log('Error: Stores were not yet loaded to cache');
  }
  return [];
};
const uniqueCities = getUniqueCities();

const getAddresses = () => {
  const addresses = [];
  if (fs.existsSync(cache.addressesTsv)) {
    fs.readFile(cache.addressesTsv, { encoding: 'utf8' }, (err, data) => {
      if (err) throw err;
      // eslint-disable-next-line
      // File format: Nimi	Katuosoite	Postinumero	Postitoimipaikka	Puhelinjafaksi	Sähköpostiosoite	Myymäläpäällikkö	Aukioloaika:ma	Aukioloaika:ti	Aukioloaika:ke	Aukioloaika:to	Aukioloaika:pe	Aukioloaika:la	Numero	Lisätiedot
      // Actual contents of file start from line 4
      const lines = data.split('\n');
      for (let i = 3; i < lines.length; i++) {
        const parsedLine = lines[i].split('\t');
        if (parsedLine.length === 15) {
          const parsed = {
            streetAddress: parsedLine[1],
            zipCode: parsedLine[2],
            postOffice: parsedLine[3],
            storeNumber: parsedLine[13],
          };
          addresses.push(parsed);
        }
      }
    });
  } else {
    console.log('Error: Addresses were not yet loaded to cache');
  }
  return addresses;
};
const addresses = getAddresses();

exports.addresses = addresses;
exports.uniqueCities = uniqueCities;
