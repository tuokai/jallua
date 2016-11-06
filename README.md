# jallua

## Projct plan
Small service for finding closest Alko that has 0.7l bottle of Jaloviina available.

Uses [Alko tuotehaku API] and [Goole maps API] to find out this information.

HTTP requests to those API's are done via our minimalistic backend and then exposed to the public via our API.

There will also be minimalistic client application that allows anyone to easily access data provided by this API.

Used technologies are not yet locked, but the initial plan is to use Node.js in backend and Angular2 in frontend.

---

Made as an assignment work for TUT's course "TIE-23600, Palvelupohjaiset järjestelmät".

[Alko tuotehaku API]: <http://apisuomi.fi/shop/json/alko-tuotehaku-api/>
[Goole maps API]: <https://developers.google.com/maps/>