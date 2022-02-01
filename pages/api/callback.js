import { setCode } from '../../spotifyApi'
import fs from 'fs-extra'
import path from 'path'

export default function handler (req, res) {
  const { access_token: accessToken } = req.query
  setCode(accessToken)

  fs.writeFileSync(path.join(process.cwd(), '/.secret'), accessToken)

  res.redirect('/')
}
