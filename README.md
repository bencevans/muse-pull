# Muse Pull

Gather posts with resolvable music from subreddits.

[Reddit API Rules](https://github.com/reddit/reddit/wiki/API)

## Example

```js
var scrape = require('muse-pull')
var sub = 'Music'
var target = 100
scrape(sub, target, function (err, tracks) {
  if (err) {
    return handleError(err)
  }
  console.log(tracks)
})

// [
//   { id: '3dusty',
//     title: 'Iron Maiden - Hallowed Be Thy Name [Heavy Metal]',
//     url: 'https://www.youtube.com/watch?v=G90ngH2anxQ',
//     track: 'Iron Maiden',
//     artist: 'Hallowed Be Thy Name',
//     tags: 'Heavy Metal'
//   },
//   {
//     id: '3dtvnw',
//     title: 'Massive Attack - Angel [trip-hop]',
//     url: 'https://www.youtube.com/watch?v=hbe3CQamF8k',
//     track: 'Massive Attack',
//     artist: 'Angel',
//     tags: 'trip-hop'
//   },
// ...
// ]
```

## Licence

MIT
