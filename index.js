import "https://deno.land/x/dotenv/load.ts";
import picipolo from "./src/picipolo.js";
// import clear from './src/clear.js';
import roll from "./src/roll.js";
import losowanie from "./src/losowanie.js";
import bociosz from "./src/bociosz.js";
import music from "./src/music/music.js";
// import quiz from "./src/music/quiz.js";
import vote from "./src/vote.js";
import custom from "./src/custom.js";
import Discord from './libs/discordeno.ts'

// export PATH = "/Users/arturwroblewski/.deno/bin:$PATH"


Discord.startBot({
  token: Deno.env.get('DISCORD_TOKEN'),
  intents: ["Guilds", "GuildMessages"],
  eventHandlers: {
    ready(){
      console.log(`Logged in!`);
    },
    reconnecting(){
      console.log("Reconnecting!");
    },
    disconnect(){
      console.log("Disconnect!");
    },
    messageCreate(msg){
      if (msg.author.bot) return;
      picipolo(msg);
      // quiz(msg)
      if (!msg.content.startsWith("!")) return;
      // clear(msg)
      roll(msg);
      losowanie(msg);
      bociosz(msg);
      music(msg);
      vote(msg);
      custom(msg);
    }
  }
})
