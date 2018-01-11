'use strict';

module.exports.id = "productOptions";

module.exports.up = function (done) {
  // use this.db for MongoDB communication, and this.log() for logging
  const productOptions = [
    {
      size: 'S',
    },
    {
      size: 'M',
    },
    {
      size: 'L',
    }
  ];
  this.db.collection('productOptions').insertMany(productOptions, done);
};

module.exports.down = function (done) {
  // use this.db for MongoDB communication, and this.log() for logging
  done();
};
