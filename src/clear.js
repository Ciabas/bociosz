import { prefix } from "./common.js";

export default function (msg) {
  if (msg.content.startsWith(`${prefix}clear`)) {
    if (msg.member.hasPermission("MANAGE_MESSAGES")) {
      let count = msg.content.match(/\d+/) ? msg.content.match(/\d+/)[0] : 10;
      count = count > 20 ? 20 : count;
      msg.channel.bulkDelete(count);
      msg.channel.send(`Wywaliłem ${count} wiadomości`);
    } else {
      msg.channel.send("Nie masz praw cwaniaczku!");
    }
  }
}
