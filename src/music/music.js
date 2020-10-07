
import { prefix } from '../common';
import skip from './skip'
import play from './play'
import stop from './stop'
import { setConnection, createControlPanel } from './actions'

export default function (message){
  const controlPanel = createControlPanel(message);

  if (message.content.startsWith(`${prefix}play`)) {
    const message = controlPanel.getMessage()
    const songName = message.content.split(" ").slice(1).join(" ");

    setConnection(controlPanel);
    play(songName, controlPanel)
  }
  if (message.content.startsWith(`${prefix}skip`)) {
    skip(controlPanel);
  }
  if (message.content.startsWith(`${prefix}stop`)) {
    stop(controlPanel);
  }
}
