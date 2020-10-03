import ytdl  from 'ytdl-core';
import { prefix } from './common';

export default function (message){
  const queue = createQueue(message);

  if (message.content.startsWith(`${prefix}play`)) {
    execute(queue);
  }
  if (message.content.startsWith(`${prefix}skip`)) {
    skip(queue);
  }
  if (message.content.startsWith(`${prefix}stop`)) {
    stop(queue);
  }
}

const createQueue = (message) =>{
  const createQueueConstruct = () => ({
    textChannel: message.channel,
    voiceChannel: null,
    connection: null,
    songs: [],
    volume: 5,
    playing: true
  });

  let queueContruct = createQueueConstruct()

  return {
    getMessage: () => message,
    getVolume: () => queueContruct.volume,
    getConnection: () => queueContruct.connection,
    setConnection: (connection) => queueContruct.connection = connection,
    setVoiceChannel: (voiceChannel) => queueContruct.voiceChannel = voiceChannel,
    leaveVoiceChannel: () => queueContruct.voiceChannel.leave(),
    resetState: () => queueContruct = createQueueConstruct(),
    addSong: (song) => queueContruct.songs.push(song),
    removeSong: (song) => queueContruct.songs.push(song),
    getSong: (index = 0) => queueContruct.songs[index],
    endDispatcher: () => queueContruct.connection.dispatcher.end(),
    resetSongs: () => queueContruct.songs = [],
    shiftFirstSong: () => queueContruct.songs.shift(),
    sendMessage: (msg) => queueContruct.textChannel.send(msg),
    isConnectedToVoiceChannel: () => message.member.voice.channel,
  }
}

async function execute(queue) {
  const message = queue.getMessage()
  const args = message.content.split(" ");

  const voiceChannel = message.member.voice.channel;
  if (!voiceChannel)
    return queue.sendMessage(
      "You need to be in a voice channel to play music!"
    );
  const permissions = voiceChannel.permissionsFor(message.client.user);
  if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
    return queue.sendMessage(
      "I need the permissions to join and speak in your voice channel!"
    );
  }

  const songInfo = await ytdl.getInfo(args[1]);
  const song = {
    title: songInfo.videoDetails.title,
    url: songInfo.videoDetails.video_url
  };

  queue.addSong(song)

  if (!queue.getConnection()) {
    queue.setVoiceChannel(voiceChannel)

    try {
      const connection = await voiceChannel.join();
      queue.setConnection(connection);
      play(queue.getSong(), queue);
    } catch (err) {
      console.log(err);
      queue.leaveVoiceChannel()
      queue.resetState();
      if(err){
        queue.sendMessage(`Error: ${err}`);
      }
    }
  } else {
    return queue.sendMessage(`${song.title} has been added to the queue!`);
  }
}

function skip(queue) {
  if (!queue.isConnectedToVoiceChannel())
    return queue.sendMessage(
      "You have to be in a voice channel to stop the music!"
    );
  if (queue.getConnection()) {
    return queue.endDispatcher()
  }
  return queue.sendMessage("There is no song that I could skip!");
}

function stop(queue) {
  if (!queue.isConnectedToVoiceChannel()) {
    return queue.sendMessage(
      "You have to be in a voice channel to stop the music!"
    );
  }
  queue.resetSongs();
  if (queue.getConnection()) {
    queue.endDispatcher();
  }
}

function play(song, queue) {
  if (!song) {
    queue.leaveVoiceChannel();
    queue.resetState();
    return;
  }

  const dispatcher = queue.getConnection()
    .play(ytdl(song.url, { quality: 'highestaudio', liveBuffer: 2000 }))
    .on("finish", () => {
      queue.shiftFirstSong();
      play(queue.getSong(), queue);
    })
    .on("error", error => console.error(error));
  dispatcher.setVolumeLogarithmic(queue.getVolume() / 5);
  queue.sendMessage(`Start playing: **${song.title}**`);
}
