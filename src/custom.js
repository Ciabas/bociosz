import { prefix } from './common';

export default function(msg){
  if (msg.content.startsWith(`${prefix}vast`)) {
    msg.channel.send("Ciabas -> Zuodziej\nGwiazda -> Lancelot \nInka -> Smoq\nKomar -> Goby\nKuba -> Jaskonia")
  }
}
