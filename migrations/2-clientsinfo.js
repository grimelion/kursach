'use strict';

module.exports.id = "clientsInfo";

module.exports.up = function (done) {
  // use this.db for MongoDB communication, and this.log() for logging
  const clients = [
    {
      firstName: 'Abraham',
      lastName: 'Katz',
      phone: '+972093847563',
      account: '',
      address: [
        {
          country: 'Israel',
          city: 'Tel Aviv-Yafo',
          houseAddress: '14 Yosef Ziman St.',
          isBilling: true,
          isShipping: true
        }
      ]
    },
    {
      firstName: 'Eli',
      lastName: 'Rubinstein',
      phone: '+972094984396',
      account: '',
      address: [
        {
          country: 'Israel',
          city: 'Tel Aviv-Yafo',
          houseAddress: '5 Heftman St.',
          isBilling: true,
          isShipping: false
        },
        {
          country: 'Israel',
          city: 'Giv\'at Shmuel',
          houseAddress: '11 Rambam St.',
          isBilling: false,
          isShipping: true
        }
      ]
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
