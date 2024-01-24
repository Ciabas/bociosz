import { prefix } from "./common.js";

export default function (msg) {
  if (
    msg.content.startsWith(`${prefix}vote `) ||
    msg.content.startsWith(`${prefix}poll `)
  ) {
    const [question, options] = msg.content.match(/"(.*?)"/g);
    const emojis = [
      ":one:",
      ":two:",
      ":three:",
      ":four:",
      ":five:",
      ":six:",
      ":seven:",
      ":eight:",
      ":nine:",
      ":keycap_ten:",
    ];
    const prepareText = (text) => text.replace(/\"/g, "").trim();

    if (!question || !options) {
      return msg.channel
        .send(`Wypadasz poza konwencję, lepiej spróbuj czegoś takiego:
        !poll "Gramy?" "Tak, Nie"`);
    }

    msg.channel
      .send(
        `${prepareText(question)}
      ${
        options
          .split(",")
          .map((option, index) => emojis[index] + " " + prepareText(option)) +
        "\n"
      }`
      )
      .then((sentEmbed) =>
        options
          .split(",")
          .forEach((option, index) => sentEmbed.react(emojis[index]))
      );
  }
}
