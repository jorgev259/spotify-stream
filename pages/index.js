import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import classNames from 'classnames'

import { getCurrentSong } from '../spotifyApi'

const padNumber = num => num < 10 ? `0${num}` : num

export async function getServerSideProps () {
  const song = await getCurrentSong()
  return { props: { song } }
}

export default function Index (props) {
  const [song, setSong] = useState(props.song)
  const { item = { album: {}, artists: [], duration_ms: 0 } } = song

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
  const degrees = (-1.8 * perc) + 270
  const transform = `rotate(${degrees}deg)`

  return (
    <div className="music-player">
  <img src={item.album.images[0].url} className="album" />
  <div className="dash">
    <div className="seeker">
      <div className="wheel">
        <div className="progress" style={{ transform }}></div>
      </div>
    </div>
    <a href="#seek" style={{ transform }}></a>
    <div className="controls">
      <a href="#play" className={classNames('fa', song.is_playing ? 'fa-play' : 'fa-pause')}></a>
    </div>
    <div className="info">
      <i><span name="current">{minProgress}:{secProgress}</span> / <span name="duration">{minTotal}:{secTotal}</span></i>
      <label>{item.artists.map(a => a.name).join(', ')} - {item.name}</label>
      <small>{item.album.name}</small>
    </div>
  </div>
</div>

  )
}
