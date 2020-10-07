
// import fetch from 'node-fetch';
// import songs from './songList';
// import {promises as fs} from 'fs';
// import { chunk, isEmpty, map, uniqBy } from 'lodash'

// const token = 'BQDXjuRLk2p7SLixXjJAOeZl7pTQlFFOz5-73fbrKp-7mauGCwp-I9xi-Aacx8cuXVai6SSoQ9ACV4S2w_uIMCtoVyirOTLtx9_Vz1Pxe5HA2XGK50VKBrqog_AzuNyco6e89IzIwViE9HI'

// const getSong = (songId) => fetch(`https://api.spotify.com/v1/tracks/${songId}?market=PL`, {
//   headers: {
//     'Accept': 'application/json',
//     'Content-Type': 'application/json',
//     'Authorization': `Bearer ${token}`
//   }
// }).then(response => response.json().then(json => json))

// const getSongData = (songId) => fetch(`https://api.spotify.com/v1/tracks/${songId}?market=PL`, {
//   headers: {
//     'Accept': 'application/json',
//     'Content-Type': 'application/json',
//     'Authorization': `Bearer ${token}`
//   }
// }).then(response => response.json().then(json => {
//   return {name: json.name, artist: json.artists && json.artists[0] && json.artists[0].name};
// }))

// let i = 0
// songs.splice(159 + 89 + 75 + 53 + 115 + 114 + 100 + 203 + 107 + 86 + 118 + 95, songs.length).map(async (song) => {
//   let data = {}
//   while(isEmpty(data) || (data && !data.name)){
//     data = await getSongData(song.spotifyId)
//     if (isEmpty(data) || (data && !data.name)){
//       console.log('petla')
//       await sleep(10000)
//     }
//   }

//   const jsonData = JSON.stringify(data) + ', ';
//   console.log((i=i+1), jsonData, data)
//   await fs.appendFile("tututut8.js", jsonData, function (err) {
//     if (err) {
//       console.log(err);
//     }
//   })
//   return
// })

// const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// function sleep(milliseconds) {
//   const date = Date.now();
//   let currentDate = null;
//   do {
//     currentDate = Date.now();
//   } while (currentDate - date < milliseconds);
// }


// import list1 from './tututut'
// import list3 from './tututut2'
// import list4 from './tututut3'
// import list5 from './tututut4'
// import list6 from './tututut5'
// import list7 from './tututut6'
// import list8 from './tututut7'
// import list9 from './tututut8'

// const bla = [...list1, ...list3, ...list4, ...list5, ...list6, ...list7, ...list8, ...list9].map(s=> ({name: s.name, artist: s.artist}))

// const uniqBla = uniqBy(bla, v => v.name + v.artist)

// fs.appendFile("all_songs.js", JSON.stringify(uniqBla), function (err) {
//     if (err) {
//       console.log(err);
//     }
//   })
