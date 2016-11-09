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
Data fetched by server is relatively static. On the first start, server fetches the data and saves it to local `cache/` folder.
Cache can be cleared by running
```
npm run cache:clear
```

### Known issues
- Server does not utilize data that is fetched on same execution. Practically this makes all current API endpoints unusable. Workaround is to restrart server after data has been fetched & cached. This has to be done only once.
