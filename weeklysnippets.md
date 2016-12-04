# Study diary

## Week 45

Timo:

- Chose Angular 2 as the client implementation technology due to it being totally novel to me
- Learned a lot about JavaScript modules
- Managed to shrink the Angular 2 Hello World example from 1.4MB to 0.5MB (before minimization) in a rather reasonable workflow
- Next week: learn about Angular 2 itself, start working on actual client functionality

A useful article: [Building an Angular 2 Application for Production](http://blog.mgechev.com/2016/06/26/tree-shaking-angular2-production-build-rollup-javascript/) (ES2015 module tree-shaking, Angular ahead-of-time compilation)

Tuomas

- Chose Node as the backend implementation technology
- First planned to cache data fetched & used by our backend as .json files, as it sounded quite easy & lightweight
- Noticed that writing json's to disk easily gets messy, and does not work as expected in Heroku
- Noticed that even though Heroku does not support mongoDB with free account, mongoDB can be used if it is hosted somewhere else
- Got familiar with [mLab], that offers MongoDB database-as-a-service
- Decided to use MongoDB, as now we had a way to use it with Heroku
- Also noticed that MongoDB makes location-bases searches very easy if location data is saved in [GeoJSON].
- Noticed that working with mongo was much easier than with cached json's, even in a such small application as this
- Implemented all the planned functionalities for the backend, as doing mandatory assignments as early as possible is always nice
- Deployed backend to Heroku
- Next week: hopefully nothing more from my part...

[GeoJSON]: <https://docs.mongodb.com/v3.2/reference/geojson/>
[mLab]: <https://mlab.com>

## Week 46

Timo

- Went through the [Angular 2 tutorial](https://angular.io/docs/ts/latest/tutorial/)
- Learned enough Angular for the purpose of this project: the basic concepts and division of concerns
- Initial data access: built a store listing from the store data using Angular
- Next week: learn Google Maps usage to get coordinates from user

## Week 47

Timo

- Looked into [angular2-google-maps](https://angular-maps.com/)
- Managed to obtain coordinate from user through manual input from the map component
- Ran into CORS trouble which will be fixed when the UI and backend are served from the same server
- Ran into a bigger obstacle: the Alko API has gone down. This will make completing the work hard if not fixed.

## Week 48

This week we noticed the Alko product API has been discontinued and we had to pivot. We chose to get weather conditions for the stores.

Timo

- Client-side
   - Changed the client UI to consist only of a map view, with details (including the new weather info) on markers
   - Minified client to save bandwidth
   - Transpile client to ES5 to support IE11; learned more about support for different ES versions
   - Setup autodeploy on Heroku; this was pleasantly easy
- Backend-side
   - Added CORS to make the public API usable by third-party SPAs
   - Added Yahoo! Weather data fetching to backend
- Lessons learned
   - Start deployments to livelike environments early
   - Develop using a realistic-sized dataset