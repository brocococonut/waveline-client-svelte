<script>
  import { link } from '../utils/Router.svelte'

  export let playlist

</script>

<style>
i.icon {
  vertical-align: top;
  line-height: 26px;
}
</style>

<a class="cs1 cm1 cl1" href="/playlists/{playlist._id}" use:link>
  <div class="media-card">
    <img src="{globalThis.wave.baseImage}" alt="{playlist.name}">
    <div class="details-container">
      <div class="card-details media-title"><span>{#if playlist.readonly}<i class="icon">lock</i>{/if}{playlist.name}</span></div>
    </div>
  </div>
</a>