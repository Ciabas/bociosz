import { prefix } from "../common.js";
import skip from "./skip.js";
import play from "./play.js";
import stop from "./stop.js";
import { createControlPanel, setConnection } from "./actions.js";

export default function (message) {
  // TODO: nie powinno to się tworzyć przy każdej wiadomości
  const controlPanel = createControlPanel(message);

  if (message.content.startsWith(`${prefix}play`)) {
    const message = controlPanel.getMessage();
    console.log(message);
    const songName = message.content.split(" ").slice(1).join(" ");

    setConnection(controlPanel);
    console.log("connected");
    console.log("connected");
    play(songName, controlPanel);
    console.log("play");
  }
  if (message.content.startsWith(`${prefix}skip`)) {
    skip(controlPanel);
  }
  if (message.content.startsWith(`${prefix}stop`)) {
    stop(controlPanel);
  }
}
