var scrape = require('./')
var level = require('level')

if (!process.argv[2]) {
  console.log('usage: muse [subreddit] [target] [leveldb]')
}

var sub = process.argv[2]
var target = process.argv[3] || 100
var levelPath = process.argv[4] || 'muse.level'

scrape(sub, target, function (err, tracks) {
  if (err) {
    throw err
  }
  if (!levelPath) {
    return console.log(tracks)
  } else {
    var db = level(levelPath)
    db.put(sub.toLowerCase(), tracks, function (err) {
      console.log(tracks.length + ' tracks info saved to `' + sub.toLowerCase() + '` in ' + levelPath)
    })
  }

})

// scrape('Music', 100, function (err, tracks) {
//   if (err) {
//     throw err
//   }
//   console.log(tracks)
// })
