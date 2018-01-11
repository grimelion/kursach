'use strict';

module.exports.id = "sizes";

module.exports.up = function (done) {
  // use this.db for MongoDB communication, and this.log() for logging
  const sizes = [
    {
      id: 0,
      name: 'warm-clothes'
    },
    {
      id: 1,
      name: 'lightweight-clothes'
    },
    {
      id: 2,
      name: 'business-clothes'
    },
    {
      id: 3,
      name: 'footwear'
    }
  ];
  this.db.collection('sizes').insertMany(sizes, done);
};

module.exports.down = function (done) {
  done();
};
