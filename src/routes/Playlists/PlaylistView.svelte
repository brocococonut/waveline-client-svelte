<script>
import {onMount} from 'svelte'
import {API} from '../../utils/api'
import {pushToQueue, play} from '../../utils/audio'

import Track from '../../components/TrackCard.svelte'

export let params

const api = new API()
let playlist = {}
let tracks = []

const loadPlaylist = async () => {
  const playlistID = params.id
  playlist = playlistID === 'FAVOURITES' ?
    { name: 'Favourites' } :
    await api.playlist(playlistID)
  
  if (playlistID === 'FAVOURITES') {
    const tracksRes = await api.tracks({
      limit: 5000,
      skip: 0,
      favourites: true
    })
    tracks = tracksRes.tracks
  } else {
    tracks = playlist.tracks
  }
}

onMount(loadPlaylist)

const playAll = () => {
  tracks.map((track, i) => i === 0 ? play(track) : pushToQueue(track))
}

const handleFavourite = ev => loadPlaylist()
</script>

<div class="grid">
  <div class="cs2 cm2 cl4 om1 ol1">
    <button style="width:100%" on:click={playAll}>Play All</button>
  </div>
</div>
<div class="grid">
  {#each tracks as track,i}
    <Track {track} on:favourited={handleFavourite}/>
  {/each}
</div>