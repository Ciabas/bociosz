'use strict';

var _picipolo = require('./src/picipolo');

var _picipolo2 = _interopRequireDefault(_picipolo);

var _clear = require('./src/clear');

var _clear2 = _interopRequireDefault(_clear);

var _roll = require('./src/roll');

var _roll2 = _interopRequireDefault(_roll);

var _losowanie = require('./src/losowanie');

var _losowanie2 = _interopRequireDefault(_losowanie);

var _bociosz = require('./src/bociosz');

var _bociosz2 = _interopRequireDefault(_bociosz);

var _music = require('./src/music');

var _music2 = _interopRequireDefault(_music);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();

var Discord = require('discord.js');
var bot = new Discord.Client();

bot.on('ready', function () {
  console.log('Logged in as ' + bot.user.tag + '!');
});
bot.once('reconnecting', function () {
  console.log('Reconnecting!');
});
bot.once('disconnect', function () {
  console.log('Disconnect!');
});

bot.on('message', function (msg) {
  if (msg.author.bot) return;
  (0, _picipolo2.default)(msg);
  if (!msg.content.startsWith('!')) return;
  (0, _clear2.default)(msg);
  (0, _roll2.default)(msg);
  (0, _losowanie2.default)(msg);
  (0, _bociosz2.default)(msg);
  (0, _music2.default)(msg);
});

bot.login(process.env.DISCORD_TOKEN);

// const PORT = process.env.PORT || 3000;
// server.listen(PORT, () => {
//   console.log(`Our app is running on port ${PORT}`);
// });