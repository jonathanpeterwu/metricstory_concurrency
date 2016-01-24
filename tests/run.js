var request = require('request');
var moment = require('moment');
var async = require('async');

async.parallel([
  function (callback) {
    // Run -  Send 32 requests back to back to http://localhost:3000/api
    for(var j=0; j < 2; j++) {
      for(var i=0; i < 32; i++) {
        request('http://localhost:3001', function (error, response, body) {
          if (!error && response.statusCode == 200) {
            console.log("200 okay, hurray!", i)
          }
          if (error) {
            throw ('Error found')
          }
        });
      }
    }
    callback(null);
  },
  function (callback) {
    // Run -  Send 5 requests back to back to http://localhost:3000/api
    for(var j=0; j < 2; j++) {
      for(var i=0; i < 5; i++) {
        request('http://localhost:3001', function (error, response, body) {
          if (!error && response.statusCode == 200) {
            console.log("200 okay, hurray!", i )
          }
          if (error) {
            throw ('Error Found')
          }
        })
      }
    }
    callback(null);
  },
  function(callback) {
    // Run -  Record the timestamp results from console log of http://localhost:3000/api
    request('http://localhost:3000/api', function (err, response, body) {
      if (!err) {
        var response = JSON.parse(response.body);

        console.log(response.time);

        if (response.time.split(':').length === 3) {
          console.log('Test Passed; format is correct')
        } else {
          throw ('Format is incorrect')
        }
      }
    });
    callback(null)
  }
], function(err, results) {
    console.log('done')
});
