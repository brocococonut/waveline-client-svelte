import {toast} from '@brocococonut/toast.js/toast.mjs'

/**
 * 
 * @param {String} url URL To make request to
 * @param {String} key Key to add to header
 */
const makeRequest = async (url, key) => {
  const headers = new Headers()
  if (key) {
    headers.set('x-api-key', key)
  }

  const res = await fetch(url)

  return res.json()
}

const storage = window.localStorage


export class API {
  constructor (base = '', key = '') {
    this.key = ''
    this.base = 'http://127.0.0.1:5002'

    if (base) this.base = base
    else {
      const storedBase = storage.getItem('apiBase')

      if (storedBase) this.base = storedBase
    }

    if (key) this.key = key
    else {
      const storedKey = storage.getItem('apiKey')

      if (storedKey) this.key = storedKey
    }
  }

  async search(query = '') {
    const url = new URL('/search', this.base)
    url.searchParams.set('q', query)

    try {
      const results = await makeRequest(url, this.key)

      return results
    } catch (err) {
      toast('An error occurred when calling the search API (/search)')
      console.error(err)

      return {
        tracks: [],
        albums: [],
        artists: []
      }
    }
  }

  async tracks({
    limit = 36,
    skip = 0,
    shuffle = false,
    favourites = false
  }) {
    const url = new URL('/tracks', this.base)
    url.searchParams.set('skip', skip)
    url.searchParams.set('limit', limit)
    if (shuffle) url.searchParams.set('shuffle', 'true')
    if (favourites) url.searchParams.set('favourites', 'true')

    try {
      const results = await makeRequest(url, this.key)

      return results
    } catch (err) {
      toast('An error occurred when calling the tracks API (/tracks)')
      console.error(err)

      return {
        tracks: [],
        total: 0,
        query: {
          skip,
          limit,
          shuffle,
          lookup: {},
          query: {}
        }
      }
    }
  }

  async playlist(id = '') {
    const url = new URL(`/playlist/${id}`, this.base)

    try {
      const playlist = await makeRequest(url, this.key)

      return playlist
    } catch (err) {
      console.error(err)
      toast('An error occurred loading the playlist')
    }
  }

  async toggleTrackFavourite(id = '') {
    const url = new URL(`/tracks/like/${id}`, this.base)

    try {
      const res = await makeRequest(url, this.key)

      return !!res._id
    } catch (err) {
      console.error(err)
      toast('An error occurred loading the playlist')

      return false
    }
  }

  getURL (path) {
    const url = new URL(path, this.base)
    if (this.key) url.searchParams.set('key', this.key)

    return url.toString()
  }
}
