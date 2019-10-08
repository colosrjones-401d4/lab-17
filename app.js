'use strict';

const hub = require('./hub');
const uuid = require('uuid');

require('./logger');
require('./network-logger');
require('./cache-invalidator');

console.log('App is listening!');

const { saveToDb } = require('./db');

alterFile = (file) => {
  fs.readFile( file, (err, data) => {
    if(err) { hub.emit('err', err); };
    let text = data.toString().toUpperCase();

    fs.writeFile( file, Buffer.from(text), (err, data) => {
      if(err) { hub.emit('err', err); };

    });
  } );
};

// Don't save until we're probably connected
setInterval(() => {
  saveToDb({ name: uuid() });
}, 500);