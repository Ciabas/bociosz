import lodash from "../libs/lodash.ts";
import { prefix } from "./common.js";

export default function (msg) {
  if (msg.content.startsWith(`${prefix}losowanie`)) {
    const [first, second] = msg.content.match(/"(.*?)"/g);
    const firstShuffled = lodash.shuffle(first.replace(/\"/g, "").split(","));
    const secondShuffled = lodash.shuffle(second.replace(/\"/g, "").split(","));

    let message = "Wylosowano:";
    firstShuffled.map((value, index) => {
      message = message + "\n" + value.trim() + " <=> " +
        (secondShuffled[index] || "").trim();
    });

    msg.channel.send(message);
  }
}
