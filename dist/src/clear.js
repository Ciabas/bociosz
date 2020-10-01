"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (msg) {
  if (msg.content.match(/^!clear/)) {
    if (msg.member.hasPermission("MANAGE_MESSAGES")) {
      var count = msg.content.match(/\d+/) ? msg.content.match(/\d+/)[0] : 10;
      msg.channel.bulkDelete(count);
    } else {
      msg.channel.send("Nie masz praw cwaniaczku!");
    }
  }
};