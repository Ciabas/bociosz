import ytdl from "../../libs/ytdlCore.ts";
import youtube from "../../libs/youtubeSr.ts";
import lodash from "../../libs/lodash.ts";

// import quizSongs from './quizSongs.json'

export default async function searchAndPlaySong(songName, controlPanel) {
  const songId =
    await (["losowe", "losowo", "cos", "random", "radom"].includes(songName)
      ? getRandom()
      : searchInYouTube(songName)).catch((err) => {
        controlPanel.sendMessage(`Can not find the song, ${err}`);
        throw Error(`Can not find the song, ${err}`);
      });

  if (!songId) {
    return;
  }

  return ytdl.getInfo(songId).then((songInfo) => {
    // TODO: tu jest problem?
    const song = {
      title: songInfo.videoDetails.title,
      url: songInfo.videoDetails.video_url,
    };

    controlPanel.addSong(song);
    return playSong(controlPanel.shiftFirstSong(), controlPanel);
  }).catch((err) => {
    if (err.message === "Status code: 429") {
      controlPanel.sendMessage(`Limit of YT request reached, ${err}`);
    }
    controlPanel.sendMessage(`Can not get song's url, ${err}`);
  });
}

function playSong(song, controlPanel) {
  if (!song) {
    controlPanel.leaveVoiceChannel();
    controlPanel.resetState();
    return;
  }

  const dispatcher = controlPanel.getConnection()
    .play(ytdl(song.url, { quality: "highestaudio", liveBuffer: 2000 }))
    .on("finish", () => playSong(controlPanel.shiftFirstSong(), controlPanel))
    .on("error", (error) => console.error(error));
  dispatcher.setVolumeLogarithmic(controlPanel.getVolume() / 5);
  controlPanel.sendMessage(`Start playing: **${song.title}**`);
}

export const searchInYouTube = (songName) =>
  youtube.searchOne(songName).then(r => r.id);

export const getRandom = () => {
  const randomSong = lodash.sample(quizSongs);
  return youtube.searchOne(`${randomSong.artist} ${randomSong.name}`).then(r => r.id);
}
