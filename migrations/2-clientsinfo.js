'use strict';

module.exports.id = "clientsInfo";

module.exports.up = function (done) {
  const clients = [
    {
      login: 'login1',
      firstName: 'Abraham',
      lastName: 'Katz',
      phone: '+972093847563'
    },
    {
      login: 'login2',
      firstName: 'Eli',
      lastName: 'Rubinstein',
      phone: '+972094984396'
    }
  ];
  this.db.collection('accounts').find().toArray((err, res) => {
    if (err) throw err;
    for (const row in res) {
      clients[row].account = res[row]._id;
    }
    this.db.collection('clients').insertMany(clients, done);
  });
};

module.exports.down = function (done) {
  // use this.db for MongoDB communication, and this.log() for logging
  done();
};
