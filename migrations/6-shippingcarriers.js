'use strict';

module.exports.id = "shippingCarriers";

module.exports.up = function (done) {
  // use this.db for MongoDB communication, and this.log() for logging
  const shippingCarriers = [
    {
      name: 'Israel Post',
      phone: '+972027290500',
      price: 6
    },
    {
      name: 'FedEx',
      phone: '+972043282943',
      price: 10
    }
  ];
  this.db.collection('shippingCarriers').insertMany(shippingCarriers, done);
};

module.exports.down = function (done) {
  // use this.db for MongoDB communication, and this.log() for logging
  done();
};
