# jallua - backend

## Running instructions
Prerequisites:
- Node (7.0+)
- yarn
- npm
- mongodb running on localhost or at location specified by the `MONGOLAB_URI` or `MONGOHQ_URI` environment variable

Install dependencies:
```
yarn install
```
(probaby also works with `npm install`, but then received set of dependencies is probably more or less untested and thus no guarantees of any kind are given.)

Start server:
```
npm start
```

## JSON REST API endpoints

### GET /stores
Gets list of Alko's stores, their locations and recent weather conditions.

CORS: everything allowed

Returns: a JSON array of store objects (see table below)

Store object field | Type | Description | Source
--- | --- | --- | ---
`storeNumber` | `string` | A four-digit code uniquely identifying the Alko store | Alko
`streetAddress` | `string` | The street address of the store | Alko
`zipCode` | `string` | The zip code of the store | Alko
`postOffice` | `string` | The name of the postal area the zip code is in | Alko
`lat` | `number` | The latitude of the store location | Google Maps geocoding
`lng` | `number` | The longitude of the store location | Google Maps geocoding
`condition.code` | `number` | An enumeration describing the weather type (see [Yahoo! reference](https://developer.yahoo.com/weather/documentation.html#codes)) | Yahoo! Weather
`condition.text` | `string` | A human-readable English description of the weather type | Yahoo! Weather
`condition.temp` | `number` | The temperature in degrees Celsius | Yahoo! Weather
`condition.date` | `string` | The date and time of when the conditions were observed | Yahoo! Weather


### GET /stores/closest?lat=<>&lng=<>

Gets store numbers of Alko stores near requested location, sorted by distance. Closest is first.

CORS: everything allowed

Returns: a JSON array of store numbers, sorted by distance to the requested point

Query parameter | Type | Description
--- | --- | ---
`lat` | Decimal number | Latitude of the point to find the closest stores for
`lng` | Decimal number | Longitude of the point to find the closest stores for

---

## Projct plan
Small service for finding information about Alko stores.

The original plan was to allow finding the closest Alko that has 0.7l bottle of Jaloviina available. This would have been accomplished with information from [Alko tuotehaku API] and [Google maps geocoding API].

Due to the Alko API becoming unavailable, we pivoted into helping users choose where to head to make their purchase in the optimal weather conditions. For this, we use the Alko store listing, Google maps geocoding API and the [Yahoo! Weather] API of the [Yahoo! Query Language (YQL)] platform.

HTTP requests to those three API's are done via our minimalistic backend and then exposed to the public via our API. The backend caches the results to a database for fast response times and less load on the utilized services.

See the [documentation](backend/README.md) for how to run and use the API. There is also a minimalistic client application that allows anyone to easily view data provided by this API, see <http://github.com/tkalliom/jallua-ui>.

The used technologies are MongoDB for persistence, Node.js (Express) in backend and Angular2 in frontend.

---

Made as an assignment work for TUT's course "TIE-23600, Palvelupohjaiset järjestelmät".

[Alko tuotehaku API]: <http://apisuomi.fi/shop/json/alko-tuotehaku-api/>
[Google maps geocoding API]: <https://developers.google.com/maps/documentation/geocoding/>
[Yahoo! Weather]: https://developer.yahoo.com/weather/
[Yahoo! Query Language (YQL)]: https://developer.yahoo.com/yql/

