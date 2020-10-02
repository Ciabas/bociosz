'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (msg) {
  if (!msg.content.startsWith(_common.prefix) && msg.content.match(/\d+/) && msg.author.username !== 'Bociosz' && Math.random() <= 0.2) {
    var number = Number(msg.content.match(/\d+/)[0]) + 1;
    msg.reply(number + ' wygrałem!');
    msg.channel.send(msg.author);
  }
};

var _common = require('./common');