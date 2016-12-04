# jallua

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