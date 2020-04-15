<script>
import { onMount, afterUpdate } from 'svelte'
import { toast } from '@brocococonut/toast.js/toast.mjs'
import Track from '../../components/TrackCard.svelte'
import Search from '../../components/Search.svelte'

import {watchEl} from '../../utils/dom'
import {API} from '../../utils/api'

let tracks = []
let container
let listener
let skip = 0
let limit = 36

let listenerEl

const api = new API()

const loadTracks = async () => {
  try {
    const trackRes = await api.tracks({
      limit,
      skip
    })

    if (trackRes.tracks.length === 0) return;
    tracks = [...tracks, ...trackRes.tracks]

    const _ids = tracks.map(o => o._id);
    tracks = tracks.filter((el, i) => _ids.indexOf(el._id) === i)

    skip += limit
  } catch (err) {
    console.error(err)
    toast("An error occurred loading tracks", 4000, 'error')
  }
}

onMount(async () => {
  await loadTracks()

  watchEl(listenerEl, loadTracks)
})
</script>

<div class="grid" bind:this={container}>
  <Search />
  {#each tracks as track,i}
    <Track {track}/>
  {/each}
  <div class="cs2 listener" bind:this={listenerEl}></div>
</div>