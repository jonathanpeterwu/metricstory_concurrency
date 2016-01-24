var async = require('async')
var request = require('request')

var MAX;
var QUEUE;

exports.init = function() {
  MAX = 10;
  QUEUE = {};
}

exports.limit = function(userId, callback) {
  // Add query parameters to queue
  QUEUE[userId] ? QUEUE[userId].push(1): QUEUE[userId] = [1];

  setTimeout(function() {
    console.log(QUEUE[userId].length)
    // If queue is larger than max split requests
    if (QUEUE[userId].length > MAX) {
      var limits = QUEUE[userId].splice(0, MAX);
      limits.forEach(function(request) {
        callback(request);
      })
    }

    // Simply pass queue if MAX is not reached
    if (QUEUE[userId].length < MAX)  {
      var limits = QUEUE[userId];
      limits.forEach(function(request) {
        callback(request);
      })

      // clear queue for user
      QUEUE[userId] = [];
    }
  }, 1000);
}
