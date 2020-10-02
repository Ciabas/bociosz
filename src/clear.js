import { prefix } from './common';

export default function(msg){
  if (msg.content.startsWith(`${prefix}clear`)){
    if(msg.member.hasPermission("MANAGE_MESSAGES")){
      const count = msg.content.match(/\d+/) ? msg.content.match(/\d+/)[0] : 10
      msg.channel.bulkDelete(count)
    }
    else {
      msg.channel.send("Nie masz praw cwaniaczku!")
    }
  }
}
