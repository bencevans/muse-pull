var test = require('tape')
var muse = require('./')

test('scrape subreddit for desired num of resolvable posts', function (t) {
  var sub = 'IndieFolk'
  var target = 50

  muse(sub, target, function (err, posts) {
    t.error(err)
    t.equal(posts.length, target)
    posts.forEach(function (track) {
      t.equal(typeof track.title, 'string')
      t.ok(track.url)
      t.ok(track.resolver)
      t.ok(track.votes) 
    })
  })
})
