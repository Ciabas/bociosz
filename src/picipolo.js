import { prefix } from "./common.js";

export default function (msg) {
  if (
    !msg.content.startsWith(prefix) &&
    msg.content.match(/\d+/) &&
    msg.author.username !== "Bociosz" &&
    Math.random() <= 0.2
  ) {
    const number = Number(msg.content.match(/\d+/)[0]) + 1;
    msg.reply(number + " wygrałem!");
    msg.channel.send(msg.author);
  }
}
