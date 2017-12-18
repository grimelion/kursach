'use strict';

module.exports.id = "categories";

module.exports.up = function (done) {
  // use this.db for MongoDB communication, and this.log() for logging
  const categories = [
    {
      id: 0,
      name: 'Default',
      children: [1, 2]
    },
    {
      id: 1,
      name: 'Headwear'
    },
    {
      id: 2,
      name: 'Food'
    }
  ];
  this.db.collection('categories').insertMany(categories, done);
};

module.exports.down = function (done) {
  done();
};
