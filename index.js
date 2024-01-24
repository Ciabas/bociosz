import { load } from "https://deno.land/std/dotenv/mod.ts";

const env = await load();
const DISCORD_TOKEN = env["DISCORD_TOKEN"];

import picipolo from "/src/picipolo.js";
// import clear from '/src/clear';
import roll from "/src/roll.js";
import losowanie from "/src/losowanie.js";
import bociosz from "/src/bociosz.js";
import music from "/src/music/music.js";
import quiz from "/src/music/quiz.js";
import vote from "/src/vote.js";
import custom from "/src/custom.js";

import * as Discord from "discord.js";

const bot = new Discord.Client();

bot.on("ready", () => {
  console.log(`Logged in as ${bot.user.tag}!`);
});
bot.once("reconnecting", () => {
  console.log("Reconnecting!");
});
bot.once("disconnect", () => {
  console.log("Disconnect!");
});

bot.on("message", (msg) => {
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
  // custom(msg)
});

bot.login(DISCORD_TOKEN);
