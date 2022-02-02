import { getCurrentSong } from '../../spotifyApi'

const sendStatus = (res, num) => res.status(num).send()

export default async function handler (req, res) {
  try {
    res.status(200).json(await getCurrentSong())
  } catch (err) {
    console.log(err.message)
    return sendStatus(res, err.statusCode)
  }
}
