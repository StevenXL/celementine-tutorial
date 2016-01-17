'use strict';

var express = require('express'),
    routes  = require('./app/routes/index.js'),
    mongo   = require('mongodb').MongoClient,
    url     = 'mongodb://localhost:27071/clementinejs',
    app     = express();

mongo.connect(url, function(err, db) {
  if (err) {
    throw new Error("Database failed to connect!");
  }
  else {
    console.log("Successfully connected to database...");
  }

  routes(app, db);

  app.use('/public', express.static(process.cwd() + '/public'));
  app.use('/controllers', express.static(process.cwd() + '/app/controllers'));

  app.listen(8080, function() {
    console.log("Listening on port 8080...");
  });
});
