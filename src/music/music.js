
import { prefix } from '../common';
import skip from './skip'
import play from './play'
import stop from './stop'
import quiz from './quiz'

export default function (message){
  const controlPanel = createControlPanel(message);

  if (message.content.startsWith(`${prefix}play`)) {
    const message = controlPanel.getMessage()
    const songName = message.content.split(" ").slice(1).join(" ");
    setConnection(controlPanel);
    play(songName, controlPanel)
  }
  if (message.content.startsWith(`${prefix}skip`)) {
    skip(controlPanel);
  }
  if (message.content.startsWith(`${prefix}stop`)) {
    stop(controlPanel);
  }
  if (message.content.startsWith(`${prefix}quiz`)) {
    setConnection(controlPanel);
    controlPanel.resetSongs()
    controlPanel.resetState()
    quiz(controlPanel);
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
