import { writable } from 'svelte/store'

let nowPlaying = []
let queueArr = []
let historyArr = []

export const queue = writable(queueArr)
export const history = writable(historyArr)