import spotifyApi from '../../spotifyApi'
const scopes = ['user-read-currently-playing']
const state = 'some-state-of-my-choice'
const showDialog = true
const responseType = 'token'

export default function handler (req, res) {
  const authorizeURL = spotifyApi.createAuthorizeURL(
    scopes,
    state,
    showDialog,
    responseType
  )

  res.redirect(authorizeURL)
}
