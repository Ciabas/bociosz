import quizSongs from './quizSongs.json'
import { shuffle } from 'lodash'
import play from './play'
import { createControlPanel, setConnection } from './actions'
import { prefix } from '../common';

export default function (message) {
  const controlPanel = createControlPanel(message);

  calculate(message, controlPanel)

  if (message.content.startsWith(`${prefix}quiz`)) {
    setConnection(controlPanel);
    controlPanel.resetSongs()
    controlPanel.resetState()
    quizStart(controlPanel);
  }
}

function quizStart(controlPanel){
  const songs = shuffle(quizSongs).slice(0, 10)
  songs.forEach(song=> play(song.artist + ' ' + song.name, controlPanel))
}

function calculate(message, controlPanel){
  const currentSong = controlPanel.getSong();

  if(message === currentSong.name){
    controlPanel.send('Dobra nazwa')
  }

  if(message === currentSong.artist){
    controlPanel.send('Dobry artysta')
  }

}
