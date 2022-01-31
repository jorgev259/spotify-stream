import SpotifyWebApi from 'spotify-web-api-node'
import fs from 'fs-extra'

const { redirectUri, clientId } = process.env

const accessCode = fs.existsSync('./.secret') && fs.readFileSync('./.secret', 'utf-8')

const spotifyApi = new SpotifyWebApi({ redirectUri, clientId })

if (accessCode) spotifyApi.setAccessToken(accessCode)

export default spotifyApi
export async function getCurrentSong () {
  const data = await spotifyApi.getMyCurrentPlayingTrack()
  return (data.body)
}
