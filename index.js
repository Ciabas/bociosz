require('dotenv').config();
require('http').createServer().listen(3000)

import picipolo from './src/picipolo'
import clear from './src/clear'

var Discord = require('discord.js');
var bot = new Discord.Client()

bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', function(msg) {
  picipolo(msg)
  clear(msg)
})

bot.login(process.env.DISCORD_TOKEN);
