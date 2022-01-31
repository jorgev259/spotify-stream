import { useEffect, useState, useRef } from 'react'
import { getCurrentSong } from '../spotifyApi'
import Image from 'next/image'

export async function getServerSideProps () {
  const song = await getCurrentSong()
  return { props: { song } }
}

export default function Home (props) {
  const [song, setSong] = useState(props.song)
  const animRef = useRef(null)

  const { item } = song

  useEffect(() => {
    setInterval(async () => {
      const res = await fetch('/api/song')
      let data = await res.json()

      if (data.currently_playing_type === 'ad') {
        data = song
        data.is_playing = false
      }
      setSong(data)
    }, 5 * 1000)
  }, [])

  useEffect(() => {
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
  }, [song.is_playing])

  return (
    <div className="container-fluid h-100">
      {item && (
        <div className="row h-100">
          <div className="col-auto p-0 m-auto">

            <div className="imgDiv">
              <div ref={animRef} className="imgDivAnim">
                <div className="imgDivInner album new">
                  <Image layout='fill' src={item.album.images[0].url} alt='' />
                </div>
                <div className="imgDivInner">
                  <Image layout='fill' src={'/img/record.png'} alt='' />
                </div>
              </div>
            </div>

          </div>
          <div className="col">
            <div>{item.artists.map(a => a.name).join(', ')}</div>
            <div>{item.album.name}</div>
            <div>{item.name}</div>
            <div>{song.progress_ms}/{item.duration_ms} ({(song.progress_ms / item.duration_ms * 100).toFixed(2)}%)</div>
          </div>
        </div>
      )}
    </div>
  )
}
