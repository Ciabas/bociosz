require('dotenv').config();
var Discord = require('discord.js');
var bot = new Discord.Client()

bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', function(msg) {
  // if (msg.content.match(/\d+/) && msg.author !== 'Bociosz'){
  //   var number = Number(msg.content.match(/\d+/)[0]) + 1;
  //   msg.reply(number + ' wygrałem!')
  // }
  if (msg.content === '!author'){
    msg.channel.send(msg.author)
  }
  if(msg.content === '!clear'){
    msg.channel.bulkDelete(100)
  }
  if (msg.content === '!losuj-na-vasta') {
    msg.channel.send('WlQ - goblin; Gwiazda - rycerz; Ciabas - złodziej, Doktor Profesor Tadeusz Zybert - jaskinia, Witalis - smok, wyniki zapisane')
  }
})
bot.login(process.env.DISCORD_TOKEN);
