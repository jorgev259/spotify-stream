import { code, getCurrentSong } from '../../spotifyApi'

export default async function handler (req, res) {
  if (!code) res.redirect('/api/login')
  try {
    res.status(200).json(await getCurrentSong())
  } catch (err) {
    if (err.statusCode === 401) res.redirect('/api/login')
    else res.redirect('/500')
  }
}
