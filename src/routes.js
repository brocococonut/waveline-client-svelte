import Home from './routes/Home.svelte'
import Playlists from './routes/Playlists/Playlists.svelte'
import PlaylistView from './routes/Playlists/PlaylistView.svelte'

import Tracks from './routes/Tracks/Tracks.svelte'
// import SubmissionView from './routes/submission/View.svelte'
// import SocialProfile from './routes/social/Profile.svelte'
// import Wild from './routes/Wild.svelte'
// import NotFound from './routes/NotFound.svelte'

export default {
  // Exact path
  '/': Home,

  // Allow children to also signal link activation
  '/playlists': Playlists,
  '/playlists/:id': PlaylistView,

  '/tracks': Tracks,
  // '/submission/view/:id': SubmissionView,

  // '/profile/:username': SocialProfile,
  
  // Using named parameters, with last being optional
  // '/hello/:first/:last?': Name,

  // Wildcard parameter
  // '/wild': Wild,
  // '/wild/*': Wild,

  // Catch-all, must be last
  // '*': NotFound,
}
