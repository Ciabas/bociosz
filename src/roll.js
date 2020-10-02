import { prefix } from './common';

export default function (msg) {
  if (msg.content.match(/^!roll/)) {
    const count = msg.content.match(/\d+/) ? msg.content.match(/\d+/)[0] : 6
    const roll = Math.floor(Math.random() * count) + 1
    msg.channel.send('Wylosowano: ' + roll)
  }
}
