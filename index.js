var redd = require('redd')
var async = require('async')
var debug = require('debug')('muse')

function getTracks (sub, after, cb) {
  debug('getTracks(%s, %s)', sub, after)
  redd({ subreddit: sub, after: after }, function (err, posts) {
    if (err) {
      return cb(err)
    }

    var knownProviderPosts = posts

    var tracks = knownProviderPosts.map(function (post) {

      var parsedTitle = post.data.title.match(/^(.+) - (.+) \[(.+)\]?/)

      if (!parsedTitle) {
        return false
      }

      return {
        id: post.data.id,
        title: post.data.title,
        url: post.data.url,
        track: parsedTitle[1],
        artist: parsedTitle[2],
        tags: parsedTitle[3]
      }
    }).filter(function (track) {
      return track
    })

    cb(null, tracks)
  })
}


module.exports = function muse (sub, target, cb) {
  var tracksSoFar = []
  var after = null

  async.whilst(function () {
    return tracksSoFar.length < target
  }, function (cb) {
    getTracks(sub, after, function (err, tracks) {
      if (err) {
        return cb(err)
      }
      tracksSoFar = tracksSoFar.concat(tracks)
      if ('t3_' + tracksSoFar[tracksSoFar.length - 1].id === after) {
        return cb(new Error('unable to reach target'), tracksSoFar)
      }
      after = 't3_' + tracksSoFar[tracksSoFar.length - 1].id
      debug(sub + ': ' + tracksSoFar.length + '/' + target)
      cb(null)
    })
  }, function (err) {
    if (err) {
      cb(err)
    }
    cb(null, tracksSoFar)
  })

}
