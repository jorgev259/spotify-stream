import { setCode } from '../../spotifyApi'

export default async function handler (req, res) {
  const { access_token: accessToken } = req.query
  await setCode(accessToken)
  res.redirect('/')
}
