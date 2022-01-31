export default function callback () {
  if (typeof window !== 'undefined') {
    const hash = window.location.hash.replace('#', '')
    location.replace(`/api/callback?${hash}`)
  }

  return <span>Loading...</span>
}
