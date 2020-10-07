import quizSongs from './quizSongs.json'
import { shuffle } from 'lodash'
import play from './play'

export function quiz(controlPanel){
  const songs = shuffle(quizSongs).slice(0, 10)
  songs.map((song) => controlPanel.addSong(song))
  play(controlPanel)
}
