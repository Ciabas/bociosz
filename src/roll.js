import { prefix } from "./common.js";

export default function (msg) {
  if (msg.content.startsWith(`${prefix}roll`)) {
    const count = msg.content.match(/\d+/) ? msg.content.match(/\d+/)[0] : 6;
    const roll = Math.floor(Math.random() * count) + 1;
    msg.channel.send("Wylosowano: " + roll);
  }
}
