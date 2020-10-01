'use strict';

var _picipolo = require('./src/picipolo');

var _picipolo2 = _interopRequireDefault(_picipolo);

var _clear = require('./src/clear');

var _clear2 = _interopRequireDefault(_clear);

var _roll = require('./src/roll');

var _roll2 = _interopRequireDefault(_roll);

var _losowanie = require('./src/losowanie');

var _losowanie2 = _interopRequireDefault(_losowanie);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();

var Discord = require('discord.js');
var bot = new Discord.Client();

bot.on('ready', function () {
  console.log('Logged in as ' + bot.user.tag + '!');
});

bot.on('message', function (msg) {
  (0, _picipolo2.default)(msg);
  (0, _clear2.default)(msg);
  (0, _roll2.default)(msg);
  (0, _losowanie2.default)(msg);
});

bot.login(process.env.DISCORD_TOKEN);

var PORT = process.env.PORT || 3000;
server.listen(PORT, function () {
  console.log('Our app is running on port ' + PORT);
});