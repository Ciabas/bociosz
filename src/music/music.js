
import { prefix } from '../common';
import skip from './skip'
import play from './play'
import stop from './stop'
import { setConnection, createControlPanel } from './actions'

export default function (message){
  // TODO: nie powinno to się tworzyć przy każdej wiadomości
  const controlPanel = createControlPanel(message);

  if (message.content.startsWith(`${prefix}play`)) {
    const message = controlPanel.getMessage()
    console.log(message)
    const songName = message.content.split(" ").slice(1).join(" ");

    setConnection(controlPanel);
    console.log('connected')
    console.log('connected')
    play(songName, controlPanel)
    console.log('play')
  }
  if (message.content.startsWith(`${prefix}skip`)) {
    skip(controlPanel);
  }
  if (message.content.startsWith(`${prefix}stop`)) {
    stop(controlPanel);
  }
}
