<script>
  import { queue, history } from './stores'
  import {onMount} from 'svelte'
	import Styles from './_styles.svelte'
  import Router from './utils/Router.svelte'
  import Nav from './components/Nav.svelte'
  import Player from './components/Player.svelte'
  
  import routes from './routes.js'

  onMount(() => {
    queue.set([])
    history.set([])
  })
</script>

<style>
main {
  padding-bottom: var(--th-nav-el-height)
}
@media (max-width: 38rem) {
  main {
    padding-bottom: calc(var(--th-nav-el-height) * 2)
  }
}
</style>

<Nav />

<Styles />

<main>
  <div class="container">
    <div class="grid-cont">
      <Router {routes}/>
    </div>
  </div>
</main>
<Player />