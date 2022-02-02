import SpotifyWebApi from 'spotify-web-api-node'
import sqlite3 from 'sqlite3'

const db = new sqlite3.Database('./sql.db')
db.run('CREATE TABLE IF NOT EXISTS spotify (id INTEGER PRIMARY KEY, secret TEXT);')

const { redirectUri, clientId } = process.env

export async function getApi () {
  const spotifyApi = new SpotifyWebApi({ redirectUri, clientId })
  return new Promise((resolve, reject) => {
    db.get('SELECT secret FROM spotify', (error, result) => {
      if (error) return reject(error)
      if (result) spotifyApi.setAccessToken(result.secret)

      resolve(spotifyApi)
    })
  })
}
export async function getCurrentSong () {
  const spotifyApi = await getApi()
  const data = await spotifyApi.getMyCurrentPlayingTrack()
  return data.body
}
export function setCode (accessCode) {
  return new Promise((resolve, reject) => {
    db.run('REPLACE INTO spotify (id, secret) VALUES (?,?)', [1, accessCode], error => {
      if (error) return reject(error)
      resolve()
    })
  })
}
