export default function stop(controlPanel) {
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
