<script>
import {onMount, afterUpdate} from 'svelte'
import Plyr from 'plyr'
import {queue} from '../stores.js'
import { moveFromQueueToHistory, moveFromHistoryToQueue } from '../utils/audio.js'
import {API} from '../utils/api'

const api = new API()

let audioEl

let currentTrack
let url = ''
let queueArr = []
let player

$: url = currentTrack ? `${api.getURL(`/tracks/play/${currentTrack._id}`)}` : ''

queue.subscribe(q => {
  currentTrack = q[0]
  queueArr = q
})

onMount(() => {
  // Create next and back buttons
  const nextEl = document.createElement('i')
  const prevEl = document.createElement('i')
  const queueEl = document.createElement('i')

  // Assign appropriate classes and inner text
  nextEl.classList = 'icon plyr__controls__item plyr__control plyr__control--pressed'
  prevEl.classList = 'icon plyr__controls__item plyr__control plyr__control--pressed'
  queueEl.classList = 'icon plyr__controls__item plyr__control plyr__control--pressed'
  nextEl.innerText = 'skip_next'
  prevEl.innerText = 'skip_previous'
  queueEl.innerText = 'queue_music'

  // Add listeners
  nextEl.onclick = moveFromQueueToHistory
  prevEl.onclick = moveFromHistoryToQueue

  const player = new Plyr(audioEl)
  /** @type {HTMLElement} */
  const playButton = player.elements.buttons.play[1]

  // Add buttons to either side of the play button
  playButton.insertAdjacentElement('beforebegin', prevEl)
  playButton.insertAdjacentElement('afterend', nextEl)

  player.on('ended', moveFromQueueToHistory)
})

</script>

<style lang="scss">
  footer {
    width: 100%;
    box-sizing: border-box;
    position: fixed;
    bottom: 0;
    z-index: 1000;
    height: var(--th-nav-el-height);
    background-color: var(--th-nav-background);
    
    .player {
      display: grid;
      position: fixed;
      left: 0;
      right: 0;
      grid-template-areas: 'details player';
      grid-template-columns: 20% auto;
      margin-left: inherit;

      .details-container {
        grid-area: details;
        width: 100%;
        .details {
          height: var(--th-nav-el-height);
          line-height: var(--th-nav-el-height);
          marquee {
            color: var(--th-nav-color);
            i.icon {
              vertical-align: middle;
            }
          }
        }
      }

      :global(.plyr.plyr--audio) {
        grid-area: player;
        :global(.plyr__controls) {
          padding-left: 0;
          height: var(--th-nav-el-height)
        }
        :global(.plyr__controls), :global(.plyr__controls .plyr__menu__container) {
          background-color: var(--th-nav-background);
          color: var(--th-nav-color) !important;
        }
      }
    }
  }

  @media (max-width: 38rem) {
    footer {
      height: calc(var(--th-nav-el-height) * 2);
      .player {
        grid-template-areas: 'details' 'player';
        grid-template-columns: auto;
        .details-container {
          border-bottom: solid 1px var(--th-nav-color)
        }
      }
    }
  }
</style>


<footer>
  <div class="player">
    <!-- <i class="icon controls">{audioEl ? 'skip_previous' : 'check_box_outline_blank'}</i> -->
    <!-- <i class="icon controls">{playButton}</i> -->
    <!-- <i class="icon controls">{audioEl ? 'skip_next' : 'check_box_outline_blank'}</i> -->
    <div class="details-container">
      <div class="details">
        {#if currentTrack}
          <marquee behavior="scroll" direction="left">
            {currentTrack.name}
            {#if currentTrack.artist !== ''} | <i class="icon">person</i> {currentTrack.artist}{/if}
            {#if currentTrack.album && currentTrack.album.name !== ''} | <i class="icon">album</i> {currentTrack.album.name}{/if}
          </marquee>
        {/if}
      </div>
    </div>
    <audio bind:this={audioEl} autoplay src="{url}"></audio>
  </div>
</footer>