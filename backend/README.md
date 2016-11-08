# Backend

## Running instructions
Prerequisites:
- Node (7.0+)
- yarn
- npm

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

`GET location/store/cities` - gets list of cities where Alko has one or more store.

## Additional notes
### Caching
Stores data is relatively static. On the first start, server fetches the data and saves it to local `cache/` folder.
