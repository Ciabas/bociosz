'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (msg) {
  if (msg.content.match(/^!roll/)) {
    var count = msg.content.match(/\d+/) ? msg.content.match(/\d+/)[0] : 6;
    var roll = Math.floor(Math.random() * count) + 1;
    msg.channel.send('Wylosowano: ' + roll);
  }
};