import { shuffle } from "lodash";

import quizSongs from "./quizSongs.json" with { type: "json" };
import play from "./play.js";
import { createControlPanel, setConnection } from "./actions.js";
import { prefix } from "../common.js";

export default function (message) {
  const controlPanel = createControlPanel(message);

  calculate(message, controlPanel);

  if (message.content.startsWith(`${prefix}quiz`)) {
    setConnection(controlPanel);
    controlPanel.resetSongs();
    controlPanel.resetState();
    quizStart(controlPanel);
  }
}

function quizStart(controlPanel) {
  const songs = shuffle(quizSongs).slice(0, 10);
  songs.forEach((song) => play(song.artist + " " + song.name, controlPanel));
}

function calculate(message, controlPanel) {
  const currentSong = controlPanel.getSong();

  if (!currentSong) {
    return;
  }

  if (message === currentSong.name) {
    controlPanel.send("Dobra nazwa");
  }

  if (message === currentSong.artist) {
    controlPanel.send("Dobry artysta");
  }
}
