import { getApi } from '../../spotifyApi'
const scopes = ['user-read-currently-playing']
const state = 'some-state-of-my-choice'
const showDialog = true
const responseType = 'token'

export default async function handler (req, res) {
  const spotifyApi = await getApi()
  const authorizeURL = spotifyApi.createAuthorizeURL(
    scopes,
    state,
    showDialog,
    responseType
  )

  res.redirect(authorizeURL)
}
