import SpotifyWebApi from 'spotify-web-api-node'
import fs from 'fs-extra'

const { redirectUri, clientId } = process.env

export let code = fs.existsSync('./.secret') && fs.readFileSync('./.secret', 'utf-8')
const spotifyApi = new SpotifyWebApi({ redirectUri, clientId })

if (code) spotifyApi.setAccessToken(code)

export default spotifyApi
export async function getCurrentSong () {
  const data = await spotifyApi.getMyCurrentPlayingTrack()
  return data.body
}
export function setCode (accessCode) {
  code = accessCode
  spotifyApi.setAccessToken(accessCode)
}
