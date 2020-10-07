import ytdl from 'ytdl-core';
import ytsr from 'ytsr';
// import axios from 'axios';
import quizSongs from './quizSongs.json'
import { sample } from 'lodash'

export default async function searchAndPlaySong(controlPanel) {
  const message = controlPanel.getMessage()
  const songName = message.content.split(" ").slice(1).join(" ");

  const searchInYouTube = () =>
    ytsr(songName).then(r => {
      const { link } = r.items[0]
      return ytdl.getVideoID(link)
    })

  // const getFromGaleria = () =>
  //   axios.get('https://galeria.brodapp.pl/api/v1/songs/random_song').then(response =>
  //     response.data.song_id
  //   )

  const getRandom = () =>{
    const  randomSong = sample(quizSongs)
    return ytsr(`${randomSong.artist} ${randomSong.name}`).then(r => {
      const { link } = r.items[0]
      return ytdl.getVideoID(link)
    })
  }

  const songId = await (['losowe', 'losowo', 'cos', 'random'].includes(songName)
    ? getRandom()
    : searchInYouTube()
  ).catch(err => controlPanel.sendMessage(`Can not find the song, ${err}`))


  const songInfo = await ytdl.getInfo(songId);
  const song = {
    title: songInfo.videoDetails.title,
    url: songInfo.videoDetails.video_url
  };

  controlPanel.addSong(song)
  return playSong(controlPanel.shiftFirstSong(), controlPanel);
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
