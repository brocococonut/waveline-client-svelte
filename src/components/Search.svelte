<script>
import {onMount} from 'svelte'
import {play} from '../utils/audio'

let searchEl
let searchVal = ''

let tracks = []
let artists = []
let albums = []

let baseImg = globalThis.wave.baseImage

$: overlayClass = (
  tracks.length > 0 ||
  artists.length > 0 ||
  albums.length > 0
) ? 'cs2 search-overlay has-results' : 'cs2 search-overlay'

const search = async (ev) => {
  console.log(ev)
  if (ev.key === 'Escape') {
    searchVal = ''
    tracks = []
    artists = []
    albums = []

    searchEl.blur()
  }
  if (
    ev.key !== 'Backspace' &&
    !(ev.keyCode >= 48 && ev.keyCode <= 57) && !(ev.keyCode >= 65 && ev.keyCode <= 90)) return;

  const searchRes = await fetch(`http://localhost:5002/search?q=${searchVal}`)
  const results = await searchRes.json()

  tracks = results.tracks
  artists = results.artists
  albums = results.albums

  console.log(albums)
}

</script>

<style lang="scss">
.search-overlay {
  width: 100%;
}

.search-overlay:focus-within, .search-overlay.has-results {
  margin-bottom: 12.8px;
  display: block;
  background-color: rgba(22,22,22,0.9);
  z-index: 1000000;
}
.search-box input {
  width: 100%;
  display: block;
}
.search-results {
  .result {
    height: calc(var(--th-nav-el-height) * 2);
    border-bottom: 1px solid var(--th-nav-color);
    padding: 0;
    img {
      display: inline-block;
      height: calc(var(--th-nav-el-height) * 2);
      width: calc(var(--th-nav-el-height) * 2);
    }
    h2 {
      display: inline-block;
      position: absolute;
      width: 100%;
      line-height: calc(var(--th-nav-el-height) * 2);
      margin: 0 5px;
    }
  }
}
</style>

<div class="{overlayClass}">
  <div class="search-box">
    <input bind:this={searchEl} bind:value={searchVal} on:keydown={search} type="text" placeholder="Search">
  </div>
  <div class="grid search-results">
    <!-- Artists -->
    {#each artists as artist}
      <div class="cs2 result artist pointer">
        <img src="{artist.picture ? artist.picture : baseImg}" alt="{artist.name}">
        <h2>{artist.name}</h2>
      </div>
    {/each}

    <!-- Albums -->
    {#if albums.length > 0 || tracks.length > 0}
      <div class="cs2"><hr></div>
    {/if}
    {#each albums as album}
      <div class="cs2 result album pointer">
        <img src="{album.picture ? album.picture : baseImg}" alt="{album.name}">
        <h2>{album.name}</h2>
      </div>
    {/each}
    <!-- Divider -->

    <!-- Tracks -->
    {#if albums.length > 0 && tracks.length > 0}
      <div class="cs2"><hr></div>
    {/if}
    {#each tracks as track}
      <div class="cs2 result track pointer" on:click={play(track)}>
        <img src="{(track.album && track.album.picture) ? track.album.picture : baseImg}" alt="{track.name}">
        <h2>{track.name}</h2>
      </div>
    {/each}
  </div>
</div>