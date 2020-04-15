<script>
  import { play, pushToQueue } from '../utils/audio'
  import { API } from '../utils/api'
  import { tick, createEventDispatcher } from 'svelte'
  import { toast } from '@brocococonut/toast.js/toast.mjs'

  export let track

  const dispatch = createEventDispatcher();

  let img = globalThis.wave.baseImage

  if (track.album && track.album.picture) {
    img = track.album.picture
  }

  let favourited = track.favourited

  const revertImage = () => {
    img = globalThis.wave.baseImage
  }

  const toggleTrackFavourite = async () => {
    const api = new API()

    if (await api.toggleTrackFavourite(track._id)) {
      favourited = !favourited
      tick()
      dispatch('favourited', favourited)
      toast(`'<b style="color:var(--th-primary)">${track.name}</b>' has been ${favourited ? 'added to' : 'removed from'} your favourites`, undefined, 'success', undefined, true)
    }
  }
</script>

<div class="cs1 cm1 cl1">
  <div class="media-card">
    <img src="{img}" alt="{track.name}" class="pointer" on:click={pushToQueue(track)} on:error={revertImage}>
    <div class="details-container">
      <div class="card-details media-title"><span>{track.name}</span></div>
      <div class="card-details">
        <i class="icon pointer" on:click="{play(track)}">play_arrow</i>
        <i class="icon pointer" on:click="{toggleTrackFavourite}">{favourited ? 'favorite' : 'favorite_border'}</i>
      </div>
    </div>
  </div>
</div>