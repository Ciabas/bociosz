import { shuffle } from 'lodash';
import { prefix } from './common';

export default function(msg){
  if (msg.content.startsWith(`${prefix}losowanie`)) {
    const [first, second] = msg.content.match(/"(.*?)"/g);
    const firstShuffled = shuffle(first.replace(/\"/g, '').split(','));
    const secondShuffled = shuffle(second.replace(/\"/g, '').split(','));

    let message = 'Wylosowano:'
    firstShuffled.map((value,index) => {
      message = message + '\n' + value.trim() + ' <=> ' + (secondShuffled[index] || '').trim()
    })

    msg.channel.send(message)
  }
}
