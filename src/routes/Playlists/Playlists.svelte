<script>
import {onMount} from 'svelte'
import {toast} from '@brocococonut/toast.js/toast.mjs'
import Playlist from '../../components/PlaylistCard.svelte'

let playlists = []

onMount(async () => {
  try {
    const res = await fetch("http://localhost:5002/playlists")
  
    const playlistRes = await res.json()
    
    playlists = playlistRes
  } catch (err) {
    toast("An error occurred loading playlists", 4000, 'error')
  }
})
</script>

<div class="grid">
  {#each playlists as playlist}
    <Playlist {playlist}/>
  {/each}
</div>