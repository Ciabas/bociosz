import ytdl from 'ytdl-core';
import { prefix } from './common';
import ytsr from 'ytsr';

export default function (message){
  const controlPanel = createControlPanel(message);

  if (message.content.startsWith(`${prefix}play`)) {
    setConnection(controlPanel);
    addSong(controlPanel)
  }
  if (message.content.startsWith(`${prefix}skip`)) {
    skip(controlPanel);
  }
  if (message.content.startsWith(`${prefix}stop`)) {
    stop(controlPanel);
  }
}

const createControlPanel = (message) =>{
  const createControlPanelConstruct = () => ({
    textChannel: message.channel,
    voiceChannel: null,
    connection: null,
    songs: [],
    volume: 5,
    playing: true
  });

  let controlPanelContruct = createControlPanelConstruct()

  return {
    getMessage: () => message,
    getVolume: () => controlPanelContruct.volume,
    getConnection: () => controlPanelContruct.connection,
    setConnection: (connection) => controlPanelContruct.connection = connection,
    setVoiceChannel: (voiceChannel) => controlPanelContruct.voiceChannel = voiceChannel,
    leaveVoiceChannel: () => controlPanelContruct.voiceChannel.leave(),
    resetState: () => controlPanelContruct = createControlPanelConstruct(),
    addSong: (song) => controlPanelContruct.songs.push(song),
    removeSong: (song) => controlPanelContruct.songs.push(song),
    getSong: (index = 0) => controlPanelContruct.songs[index],
    endDispatcher: () => controlPanelContruct.connection.dispatcher.end(),
    resetSongs: () => controlPanelContruct.songs = [],
    shiftFirstSong: () => controlPanelContruct.songs.shift(),
    sendMessage: (msg) => controlPanelContruct.textChannel.send(msg),
    isConnectedToVoiceChannel: () => message.member.voice.channel,
  }
}

async function setConnection(controlPanel) {
  const message = controlPanel.getMessage()

  const voiceChannel = message.member.voice.channel;
  if (!voiceChannel){
    return controlPanel.sendMessage(
      "You need to be in a voice channel to play music!"
      );
  }
  const permissions = voiceChannel.permissionsFor(message.client.user);
  if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
    return controlPanel.sendMessage(
      "I need the permissions to join and speak in your voice channel!"
      );
  }

  if (!controlPanel.getConnection()) {
    controlPanel.setVoiceChannel(voiceChannel)

    try {
      const connection = await voiceChannel.join();
      controlPanel.setConnection(connection);
    } catch (err) {
      console.log(err);
      controlPanel.leaveVoiceChannel()
      controlPanel.resetState();
      if(err){
        controlPanel.sendMessage(`Error: ${err}`);
      }
    }
  } else {
    return controlPanel.sendMessage("No connection, try again later.");
  }
}

function skip(controlPanel) {
  if (!controlPanel.isConnectedToVoiceChannel())
    return controlPanel.sendMessage(
      "You have to be in a voice channel to stop the music!"
    );
  if (controlPanel.getConnection()) {
    return controlPanel.endDispatcher()
  }
  return controlPanel.sendMessage("There is no song that I could skip!");
}

function stop(controlPanel) {
  if (!controlPanel.isConnectedToVoiceChannel()) {
    return controlPanel.sendMessage(
      "You have to be in a voice channel to stop the music!"
    );
  }
  controlPanel.resetSongs();
  if (controlPanel.getConnection()) {
    controlPanel.endDispatcher();
  }
}

async function addSong(controlPanel){
  const message = controlPanel.getMessage()
  const songName = message.content.split(" ").slice(1).join(" ");

  const songId = await ytsr(songName).then(r => {
    const { link } = r.items[0]
    return ytdl.getVideoID(link)
  }).catch (err => controlPanel.sendMessage(`Can not find the song, ${err}`))

  const songInfo = await ytdl.getInfo(songId);
  const song = {
    title: songInfo.videoDetails.title,
    url: songInfo.videoDetails.video_url
  };

  controlPanel.addSong(song)
  playSong(controlPanel.getSong(), controlPanel);
}

function playSong(song, controlPanel) {
  if (!song) {
    controlPanel.leaveVoiceChannel();
    controlPanel.resetState();
    return;
  }

  const dispatcher = controlPanel.getConnection()
    .play(ytdl(song.url, { quality: 'highestaudio', liveBuffer: 2000 }))
    .on("finish", () => {
      controlPanel.shiftFirstSong();
      play(controlPanel.getSong(), controlPanel);
    })
    .on("error", error => console.error(error));
  dispatcher.setVolumeLogarithmic(controlPanel.getVolume() / 5);
  controlPanel.sendMessage(`Start playing: **${song.title}**`);
}
