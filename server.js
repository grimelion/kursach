require('babel-register');

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const logger = require('morgan');
const async = require('async');
const colors = require('colors');
const mongoose = require('mongoose');
const request = require('request');
const React = require('react');
const ReactDOM = require('react-dom/server');
const Router = require('react-router');
const swig = require('swig');
const _ = require('underscore');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const app = express();
const url = 'mongodb://admin:admin_password@ds033986.mlab.com:33986/db_mummakill';

mongoose.connect('mongodb://admin:admin_password@ds033986.mlab.com:33986/db_mummakill', { useMongoClient: true });
mongoose.connection.on('error', () => {
  console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?'.red);
});

app.set('port', process.env.PORT || 3001);
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/auth', (req, res, next) => {
  MongoClient.connect(url, (err, db) => {
    assert.equal(null, err);
    const dbConnect = db.db('db_mummakill')
    dbConnect.collection('accounts').insertOne(req.body, (errCol, result) => {
      assert.equal(null, errCol);
      db.close();
      res.send(result.insertedId);
    })
  });
});

app.post('/settings', (req, res, next) => {
  MongoClient.connect(url, (err, db) => {
    assert.equal(null, err);
    const dbConnect = db.db('db_mummakill');
    dbConnect.collection('clients').update({_id: req.body['_id']}, req.body, {upsert: true});
  });
});

app.use((req, res) => {
  var page = swig.renderFile('views/index.html');
  res.status(200).send(page);
});

app.use((err, req, res, next) => {
  console.log(err.stack.red);
  res.status(err.status || 500);
  res.send({ message: err.message });
});


const server = require('http').createServer(app);
const io = require('socket.io')(server);
let onlineUsers = 0;

io.sockets.on('connection', (socket) => {
  onlineUsers++;

  io.sockets.emit('onlineUsers', { onlineUsers: onlineUsers });

  socket.on('disconnect', function () {
    onlineUsers--;
    io.sockets.emit('onlineUsers', { onlineUsers: onlineUsers });
  });
});

server.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});