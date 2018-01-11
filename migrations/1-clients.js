'use strict';

module.exports.id = "clients";

module.exports.up = function (done) {
  this.db.collection('accounts').insertMany([
    {
      login: 'a.katz@gmail.com',
      password: '9e159d5a9424dcc2bff464ffc781c5e0' // md5('IEatMatzo')
    },
    {
      login: 'rubin1985@gmail.com',
      password: '2dd876cd8f0d2b2f998ab9db7d59e062' // md5('El1Rub1n')
    }
  ], done);
};

module.exports.down = function (done) {
  done();
};
