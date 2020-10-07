import ytdl from 'ytdl-core';
import ytsr from 'ytsr';
import quizSongs from './quizSongs.json'
import { sample } from 'lodash'

export default async function searchAndPlaySong(controlPanel) {
  const message = controlPanel.getMessage()
  const songName = message.content.split(" ").slice(1).join(" ");

  const songId = await (['losowe', 'losowo', 'cos', 'random', 'radom'].includes(songName)
    ? getRandom()
    : searchInYouTube()
  ).catch(err => controlPanel.sendMessage(`Can not find the song, ${err}`))

  if (!songId){
    return
  }

  return ytdl.getInfo(songId).then(songInfo => {
    const song = {
      title: songInfo.videoDetails.title,
      url: songInfo.videoDetails.video_url
    };

    controlPanel.addSong(song)
    return playSong(controlPanel.shiftFirstSong(), controlPanel);
  }).catch (err => controlPanel.sendMessage(`Can not get song's url, ${err}`))
}

function playSong(song, controlPanel) {
  if (!song) {
    controlPanel.leaveVoiceChannel();
    controlPanel.resetState();
    return;
  }

  const dispatcher = controlPanel.getConnection()
    .play(ytdl(song.url, { quality: 'highestaudio', liveBuffer: 2000 }))
    .on("finish", () => play(controlPanel.getSong(), controlPanel))
    .on("error", error => console.error(error));
  dispatcher.setVolumeLogarithmic(controlPanel.getVolume() / 5);
  controlPanel.sendMessage(`Start playing: **${song.title}**`);
}

export const searchInYouTube = () =>
  ytsr(songName).then(r => {
    const { link } = r.items[0]
    return ytdl.getVideoID(link)
  })

export const getRandom = () => {
  const randomSong = sample(quizSongs)
  return ytsr(`${randomSong.artist} ${randomSong.name}`).then(r => {
    const { link } = r.items[0]
    return ytdl.getVideoID(link)
  })
}
