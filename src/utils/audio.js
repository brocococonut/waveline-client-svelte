import { Writable } from 'svelte/store'
import { Track } from '../types/track'

import { queue, history } from '../stores'
import { toast } from '@brocococonut/toast.js/toast.mjs'
import { unshift, push } from './arrays'

/**
 * Play a song by either replacing the current song or pushing it to the array
 * @param {Track} track Track to play
 */
export const play = track => queue.update(q => {
  if (q.length > 0) {
    moveFromQueueToHistory()
    return unshift(q, track)
  }
  
  return push(q, track)
})

/**
 * Move a track from the beginning of one queue to the beginning of the other
 * @param {Writable<[Track]>} from Queue to take track from
 * @param {Writable<[Track]>} to Queue to add track to
 */
const updateQueue = (from, to) => from.update(q => {
  const track = q.shift()

  if (track) to.update(h => unshift(h, track))

  return q
})

/**
 * Move a track to the history array from the queue
 */
export const moveFromQueueToHistory = () => updateQueue(queue, history)

/**
 * Move a track to the queue array from the history
 */
export const moveFromHistoryToQueue = () => updateQueue(history, queue)

/**
 * Push a track to the end of the queue
 * @param {Track} track Add a new track to the queue
 */
export const pushToQueue = track => {
  queue.update(q => push(q, track))
  toast(`"${track.name}" added to the queue.`, 2000)
}

/**
 * Clear the play history
 */
export const clearHistory = history.set([])

/**
 * Clear the track queue
 */
export const clearqueue = queue.set([])
