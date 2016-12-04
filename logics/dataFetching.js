const request = require('superagent');
const mongoose = require('mongoose');

require('../models/store');

const config = require('../config');
const dataHandling = require('./dataHandling');

const Store = mongoose.models.Store;

let lastWeatherUpdate = new Date(0);

const fetchAddresses = () => (
  request
    .get(config.apiUrls.alko.tsvAddresses)
    .then(res => res.text, err => console.log('Error when fetching addresses', err))
);

const mapAddressToCoordinates = (address) => {
  const urlFriendlyStreetAddress = encodeURI(address);
  const apiKey = process.env.GMAPS_API_KEY || config.apiKeys.google;
  const apiUrl = config.apiUrls.google.maps.geocode;
  const requestUrl = `${apiUrl}/json?address=${urlFriendlyStreetAddress}&key=${apiKey}`;
  return request
    .get(requestUrl)
    .then((res) => {
      const coordinates = res.body.results[0].geometry.location;
      // Return coordinates in format that can be used as mongodb location
      return [coordinates.lng, coordinates.lat];
    }, (err) => {
      console.log(`Error: failed to map address "${address}" to coordinates, error:`, err);
    });
};

const storeAddressesToDb = () => (
  fetchAddresses().then((addresses) => {
    const parsed = dataHandling.parseAddressResponse(addresses);
    parsed.forEach((item) => {
      Store.findOne({ storeNumber: item.storeNumber }, (err, store) => {
        if (err) {
          console.log('db error:', err);
        }
        if (!store) {
          // Store is not yet saved to DB
          // Get coordinates of store from google maps api
          const { streetAddress, zipCode, postOffice } = item;
          const addressString = `${streetAddress}, ${zipCode} ${postOffice}`;
          mapAddressToCoordinates(addressString)
          .then((coordinates) => {
            const dbEntry = Object.assign({}, item, { location: { type: 'Point', coordinates } });
            new Store(dbEntry).save((saveError) => {
              if (saveError) {
                console.log('Failed to save item to db', saveError);
              }
            });
          })
          .catch((locationErr) => {
            console.log('Failed to map address to coordinates', locationErr);
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
  .catch(err => console.log(err))
);

const storeWoeidsToDb = () => (
  Store.find({ woeid: null })
    .then((stores) => {
      if (!stores.length) {
        return [];
      }
      const zips = stores.map(store => store.zipCode).join(',');
      return request
        .get(config.apiUrls.yahoo.yql)
        .query({ q: `select woeid, postal.content from geo.places(1) where placetype=11 and text in (${zips}) and focus="FI"` })
        .query({ format: 'json' })
        .then(res => res.body.query.results.place);
    }, err => console.log('db error:', err),
    ).then(
      woelist => Promise.all(
        (woelist instanceof Array ? woelist : [woelist]).map(woeitem => Store.update(
            { woeid: null, zipCode: woeitem.postal },
            { $set: { woeid: woeitem.woeid } },
            { multi: true },
        )),
      ), err => console.log('Error: failed to get woeids, error:', err),
    )
);

const storeWeatherToDb = () => (
  Store.find().distinct('woeid')
    .then((woeids) => {
      if (!woeids.length) {
        return [];
      }
      return request
        .get(config.apiUrls.yahoo.yql)
        .query({ q: `select item.link, item.condition from weather.forecast where woeid in (${woeids.join(',')}) and u='c'` })
        .query({ format: 'json' })
        .then(res => res.body.query.results.channel);
    }, (err) => {
      console.log('db error:', err);
    })
    .then(
      weatherlist => Promise.all((weatherlist instanceof Array ? weatherlist : [weatherlist])
        .map(weatheritem => Store.update(
          { woeid: /[0-9]{6,}/.exec(weatheritem.item.link)[0] },
          { $set: { condition: weatheritem.item.condition } },
          { multi: true },
        )),
      ), err => console.log('Error: failed to get weathers, error:', err),
    )
    .then(() => { lastWeatherUpdate = new Date(); })
);

const updateDb = () => {
  storeAddressesToDb()
    .then(storeWoeidsToDb)
    .then(storeWeatherToDb);
};

const refreshWeather = () => (
  ((new Date()) - lastWeatherUpdate) > config.weatherRefreshInterval ?
    storeWoeidsToDb().then(storeWeatherToDb)
    :
    Promise.resolve(null)
);

exports.updateDb = updateDb;
exports.refreshWeather = refreshWeather;
