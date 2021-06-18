export default function skip(controlPanel) {
  if (!controlPanel.isConnectedToVoiceChannel()) {
    return controlPanel.sendMessage(
      "You have to be in a voice channel to stop the music!",
    );
  }
  if (controlPanel.getConnection()) {
    return controlPanel.endDispatcher();
  }
  return controlPanel.sendMessage("There is no song that I could skip!");
}
