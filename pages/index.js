import { useEffect, useState/*, useRef */ } from 'react'
// import Image from 'next/image'
import classNames from 'classnames'

import { code, getCurrentSong } from '../spotifyApi'

const padNumber = num => num < 10 ? `0${num}` : num

export async function getServerSideProps (context) {
  if (!code) return { redirect: { destination: '/api/login', permanent: false } }
  try {
    const song = await getCurrentSong()
    return { props: { song } }
  } catch (err) {
    if (err.statusCode === 401) return { redirect: { destination: '/api/login', permanent: false } }
    else return { redirect: { destination: '/500', permanent: false } }
  }
}

export default function Index (props) {
  const [song, setSong] = useState(props.song)
  const { item = { album: { images: [{ url: '/img/blank.png' }] }, artists: [], duration_ms: 0 } } = song

  useEffect(() => {
    setInterval(async () => {
      const res = await fetch('/api/song')
      let data = await res.json()

      if (data.currently_playing_type === 'ad') {
        data = song
        data.is_playing = false
      }
      setSong(data)
    }, 1 * 1000)
  }, [])

  /* useEffect(() => {
    const running = song.is_playing
    const element = animRef.current

    if (running) {
      element.classList.add('running')
    } else if (element.classList.contains('running')) {
      element.classList.add('stopping')
      element.addEventListener('animationiteration', () => {
        element.classList.remove('running', 'stopping')
      }, { once: true })
    }
  }, [song.is_playing]) */

  const minProgress = 0 | (song.progress_ms / 1000 / 60)
  const secProgress = padNumber(0 | (song.progress_ms / 1000) % 60)

  const minTotal = 0 | (item.duration_ms / 1000 / 60)
  const secTotal = padNumber(0 | (item.duration_ms / 1000) % 60)

  const perc = song.progress_ms / item.duration_ms * 100
  const degrees = (-1.8 * perc) + 360
  const transform = `rotate(${degrees}deg)`

  return (
    <div className="music-player">
      <img src={item.album.images[0].url} className="album" />
      <div className="dash">
        <div className="dashInner">
          <div className="controls">
            <div className="playDiv">
              <a href="#play" className={classNames('center fa', song.is_playing ? 'fa-play' : 'fa-pause')}></a>
            </div>
          </div>
          <div className="info">
            <i><span name="current">{minProgress}:{secProgress}</span> / <span name="duration">{minTotal}:{secTotal}</span></i>
            <label>{item.artists.map(a => a.name).join(', ')} - {item.name}</label>
            <small>{item.album.name}</small>
          </div>
        </div>
      </div>

      <div className="seeker">
        <div className='wheelImg center'>
          <div className='wheelRotate' style={{ transform }}>
            <a href="#seek"></a>
            <img src={'/img/progress.png'} />
          </div>
        </div>
      </div>
    </div>
  )
}
