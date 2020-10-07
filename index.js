require('dotenv').config();

import picipolo from './src/picipolo';
import clear from './src/clear';
import roll from './src/roll';
import losowanie from './src/losowanie';
import bociosz from './src/bociosz';
import music from './src/music/music';
import quiz from './src/music/quiz';

var Discord = require('discord.js');
var bot = new Discord.Client()

bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`);
});
bot.once('reconnecting', () => {
  console.log('Reconnecting!');
});
bot.once('disconnect', () => {
  console.log('Disconnect!');
});

bot.on('message', function(msg) {
  if (msg.author.bot) return;
  picipolo(msg)
  quiz(msg)
  if (!msg.content.startsWith('!')) return;
  clear(msg)
  roll(msg)
  losowanie(msg)
  bociosz(msg)
  music(msg)
})

bot.login(process.env.DISCORD_TOKEN);
