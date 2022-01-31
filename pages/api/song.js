import { getCurrentSong } from '../../spotifyApi'

export default async function handler (req, res) {
  res.status(200).json(await getCurrentSong())
}
