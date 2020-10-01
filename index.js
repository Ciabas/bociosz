require('dotenv').config();

import picipolo from './src/picipolo';
import clear from './src/clear';
import roll from './src/roll';
import losowanie from './src/losowanie';
import bociosz from './src/bociosz';

var Discord = require('discord.js');
var bot = new Discord.Client()

bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', function(msg) {
  picipolo(msg)
  clear(msg)
  roll(msg)
  losowanie(msg)
  bociosz(msg)
})

bot.login(process.env.DISCORD_TOKEN);

// const PORT = process.env.PORT || 3000;
// server.listen(PORT, () => {
//   console.log(`Our app is running on port ${PORT}`);
// });
