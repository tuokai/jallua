# Backend

## Running instructions
Prerequisites:
- Node (7.0+)
- yarn
- npm
- mongodb running on localhost

Install dependencies:
```
yarn install
```
(probaby also works with `npm install`, but then received set of dependencies is probably more or less untested and thus no guarantees of any kind are given.)

Start server:
```
npm run
```

## API endpoints

`GET stores` - gets list of Alko's stores & their addresses

`GET stores/closest` - gets store numbers of Alko stores near requested location, sorted by distance. Closest is first.

Expected query params:
`lat` and `lng`
