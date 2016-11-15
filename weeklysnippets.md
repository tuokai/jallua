# Study diary

## Week 45

Timo:

- Chose Angular 2 as the client implementation technology due to it being totally novel to me
- Learned a lot about JavaScript modules
- Managed to shrink the Angular 2 Hello World example from 1.4MB to 0.5MB (before minimization) in a rather reasonable workflow
- Next week: learn about Angular 2 itself, start working on actual client functionality

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